import { NavLink } from "react-router";

const links = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/habits", label: "Hábitos" },
  { path: "/calendar", label: "Calendário" },
  { path: "/statistics", label: "Estatísticas" },
  { path: "/profile", label: "Perfil" },
  { path: "/settings", label: "Configurações" },
];

function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) => (isActive ? "link-ativo" : "")}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
