import { BrowserRouter, Routes, Route } from "react-router";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/" element={<div>Dashboard</div>} />
        <Route path="/habitos" element={<div>Hábitos</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
