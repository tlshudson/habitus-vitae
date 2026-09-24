type HeaderProps = {
  nomeUsuario: string;
};

function Header({ nomeUsuario }: HeaderProps) {
  return (
    <header className="app-header">
      <span>Olá, {nomeUsuario}</span>
    </header>
  );
}
export default Header;
