# Arquitetura de Sistema — Tracker de Rotinas

## 1. Visão Geral

Stack sugerida:

- **Frontend:** React
- **Backend:** PHP + Laravel
- **Banco de Dados:** PostgreSQL
- **Cache / Filas:** Redis
- **Containerização:** Docker
- **Servidor Web:** Nginx

A recomendação inicial é utilizar um **monólito modular**, evitando microserviços no MVP.

```text
                    ┌───────────────────────┐
                    │       React SPA       │
                    │                       │
                    │ Dashboard             │
                    │ Rotinas / Hábitos     │
                    │ Calendário            │
                    │ Estatísticas          │
                    └───────────┬───────────┘
                                │
                          HTTPS / REST API
                                │
                    ┌───────────▼───────────┐
                    │      PHP / Laravel    │
                    │                       │
                    │  Auth                 │
                    │  Users                │
                    │  Habits               │
                    │  Routines             │
                    │  Check-ins            │
                    │  Goals                │
                    │  Statistics           │
                    │  Notifications        │
                    └─────┬─────────┬───────┘
                          │         │
                 ┌────────▼───┐ ┌──▼───────────┐
                 │ PostgreSQL │ │    Redis     │
                 │            │ │              │
                 │ dados      │ │ cache        │
                 │ históricos │ │ sessões      │
                 │ usuários   │ │ filas        │
                 │ hábitos    │ │ rate-limit   │
                 └────────────┘ └──────┬───────┘
                                       │
                                 ┌─────▼─────┐
                                 │  Worker   │
                                 │ Laravel   │
                                 │ Queue     │
                                 └───────────┘
```

---

## 2. Containers Docker

```text
Docker
├── frontend
│   └── React
├── api
│   └── PHP / Laravel
├── worker
│   └── Laravel Queue
├── scheduler
│   └── Laravel Scheduler
├── postgres
├── redis
└── nginx
```

Estrutura sugerida do repositório:

```text
tracker-rotinas/
│
├── backend/
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── tests/
│
├── frontend/
│   ├── src/
│   └── public/
│
├── docker/
│   ├── nginx/
│   ├── php/
│   └── postgres/
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 3. Frontend — React

Estrutura sugerida:

```text
src/
├── api/
├── components/
├── features/
│   ├── auth/
│   ├── habits/
│   ├── routines/
│   ├── checkins/
│   ├── goals/
│   └── statistics/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
└── stores/
```

### Páginas principais

```text
/login
/register

/dashboard

/habits
/habits/new
/habits/:id

/routines
/routines/new
/routines/:id

/calendar

/statistics

/profile
/settings
```

---

## 4. Domínio

### Hábito

Um hábito representa uma ação individual.

Exemplos:

- Beber água
- Fazer academia
- Ler 10 minutos
- Meditar
- Dormir antes das 23h

### Rotina

Uma rotina agrupa vários hábitos.

Exemplo:

```text
Rotina: Manhã

├── Beber água
├── Arrumar cama
├── Meditar
├── Ler 10 minutos
└── Tomar café
```

---

## 5. Backend — Laravel

Estrutura baseada em monólito modular:

```text
app/

├── Modules/
│
│   ├── Auth/
│   │   ├── Controllers/
│   │   ├── Services/
│   │   └── DTOs/
│
│   ├── Habit/
│   │   ├── Controllers/
│   │   ├── Models/
│   │   ├── Services/
│   │   ├── Repositories/
│   │   ├── Actions/
│   │   └── DTOs/
│
│   ├── Routine/
│   ├── Checkin/
│   ├── Goal/
│   ├── Statistics/
│   └── Notification/
│
└── Shared/
```

Fluxo:

```text
Request
   ↓
Controller
   ↓
FormRequest
   ↓
Action / Service
   ↓
Repository / Model
   ↓
PostgreSQL
   ↓
Resource
   ↓
JSON Response
```

---

## 6. Banco de Dados — PostgreSQL

Tabelas principais:

```text
users
habits
routines
routine_habits
habit_schedules
habit_checkins
goals
streaks
reminders
tags
habit_tags
```

Relacionamentos:

```text
users
  │
  ├──── habits
  │       │
  │       ├──── habit_schedules
  │       ├──── habit_checkins
  │       ├──── goals
  │       └──── reminders
  │
  └──── routines
          │
          └──── routine_habits
                    │
                    └──── habits
```

---

## 7. Tabela `habits`

Campos sugeridos:

```text
id
user_id
name
description
color
icon
type
frequency_type
target_value
target_unit
active
created_at
updated_at
deleted_at
```

Exemplo de hábito quantitativo:

```text
name: Beber água
type: QUANTITY
target_value: 2000
target_unit: ml
```

Exemplo de hábito booleano:

```text
name: Academia
type: BOOLEAN
```

---

## 8. Frequência dos Hábitos

Tabela:

```text
habit_schedules
```

Campos:

```text
id
habit_id
frequency_type
day_of_week
day_of_month
start_date
end_date
interval_value
```

Tipos de frequência:

```text
DAILY
WEEKLY
MONTHLY
INTERVAL
```

Exemplo semanal:

```text
Academia

WEEKLY
segunda
quarta
sexta
```

Exemplo diário:

```text
Tomar vitamina

DAILY
```

Exemplo por intervalo:

```text
Cortar cabelo

INTERVAL
30 dias
```

---

## 9. Check-ins

Tabela:

```text
habit_checkins
```

Campos:

```text
id
habit_id
user_id
scheduled_date
completed_at
status
value
notes
created_at
updated_at
```

Status possíveis:

```text
PENDING
COMPLETED
SKIPPED
MISSED
```

Exemplo quantitativo:

```text
Beber água
2026-08-25

value: 1800
status: COMPLETED
```

Exemplo booleano:

```text
Academia
2026-08-25

status: COMPLETED
```

---

## 10. Streaks

A fonte da verdade deve continuar sendo o histórico de check-ins.

Tabela auxiliar:

```text
streaks
```

Campos:

```text
habit_id
current_streak
longest_streak
last_completed_date
```

Fluxo:

```text
habit_checkins
     ↓
StreakCalculator
     ↓
current_streak
longest_streak
```

---

## 11. Redis

O Redis pode ser utilizado para:

- Cache
- Filas
- Sessões
- Rate limit
- Locks distribuídos
- Dados temporários

### Cache de dashboard

Exemplo de chave:

```text
dashboard:user:123
```

Exemplo:

```json
{
  "completed": 7,
  "pending": 3,
  "streak": 14
}
```

TTL sugerido:

```text
5 minutos
```

---

## 12. Filas

Fluxo possível:

```text
Usuário completa hábito
           ↓
      POST /checkins
           ↓
      PostgreSQL
           ↓
        Event
           ↓
         Redis
           ↓
        Worker
       ↙      ↘
statistics   achievements
```

---

## 13. Eventos

Eventos de domínio sugeridos:

```text
HabitCreated
HabitCompleted
HabitSkipped
RoutineCompleted
GoalReached
StreakReached
```

Exemplo:

```text
HabitCompleted
       │
       ├── UpdateStreak
       ├── UpdateStatistics
       ├── CheckAchievements
       └── ClearDashboardCache
```

---

## 14. Scheduler

O Laravel Scheduler pode executar:

- geração dos hábitos do dia;
- detecção de hábitos não concluídos;
- lembretes;
- atualização de estatísticas;
- limpeza de cache;
- jobs recorrentes.

Exemplo:

```text
00:05

GenerateDailyHabitInstances
```

---

## 15. API REST

Versão inicial:

```text
/api/v1
```

### Auth

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
```

### Habits

```http
GET    /api/v1/habits
POST   /api/v1/habits
GET    /api/v1/habits/:id
PUT    /api/v1/habits/:id
DELETE /api/v1/habits/:id
```

### Routines

```http
GET    /api/v1/routines
POST   /api/v1/routines
GET    /api/v1/routines/:id
PUT    /api/v1/routines/:id
DELETE /api/v1/routines/:id
```

### Check-ins

```http
GET  /api/v1/checkins
POST /api/v1/checkins
PUT  /api/v1/checkins/:id
```

### Dashboard

```http
GET /api/v1/dashboard
```

### Estatísticas

```http
GET /api/v1/statistics
```

### Calendário

```http
GET /api/v1/calendar
```

### Goals

```http
GET  /api/v1/goals
POST /api/v1/goals
```

---

## 16. Dashboard

Endpoint:

```http
GET /api/v1/dashboard
```

Exemplo de resposta:

```json
{
  "date": "2026-08-25",
  "summary": {
    "total": 8,
    "completed": 5,
    "pending": 3,
    "completion_rate": 62.5
  },
  "habits": [],
  "streaks": {
    "current": 12,
    "longest": 27
  }
}
```

---

## 17. Arquitetura Lógica

```text
              TRACKER DE ROTINAS
                    │
        ┌───────────┴───────────┐
        │                       │
     React SPA                API
                                │
                     ┌──────────┴─────────┐
                     │                    │
                 Application            Domain
                     │                    │
                Controllers          Habit
                Actions              Routine
                Services             Checkin
                DTOs                 Goal
                     │               Streak
                     │
                Infrastructure
                     │
          ┌──────────┼───────────┐
          │          │           │
      PostgreSQL   Redis       Queue
```

---

## 18. Ordem de Implementação do MVP

1. Docker + Laravel + PostgreSQL + React
2. Autenticação
3. CRUD de hábitos
4. Frequência dos hábitos
5. Check-in diário
6. Dashboard do dia
7. Histórico / calendário
8. Cálculo de streak
9. Rotinas agrupando hábitos
10. Redis para cache
11. Queue + eventos
12. Lembretes
13. Estatísticas
14. Gamificação

---

## 19. Arquitetura Recomendada para o MVP

```text
React
   ↓
Laravel Modular
   ↓
PostgreSQL
   ↕
Redis
```

### Decisão arquitetural principal

Antes do desenvolvimento, definir claramente o fluxo:

```text
Hábito
  ↓
Frequência
  ↓
Execução prevista
  ↓
Check-in
  ↓
Streak
  ↓
Estatísticas
```

Esse fluxo será a base das regras de negócio, modelagem do banco e API.

---

## 20. Evolução Futura

Caso o sistema cresça significativamente, alguns módulos podem ser extraídos para serviços independentes:

```text
Core Laravel
├── Habits
├── Routines
├── Check-ins
└── Goals

Serviços futuros
├── Notifications Service
├── Analytics Service
├── Gamification Service
└── Recommendation Service
```

No início, porém, a prioridade deve ser manter a arquitetura simples, modular e fácil de evoluir.
