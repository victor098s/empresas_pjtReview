import "./Navbar.css";

function Navbar() {

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <header className="navbar">

      <div className="logo">
        <h2>RedBear Companies</h2>
      </div>

      <nav>

        <a href="/dashboard">Dashboard</a>

        <a href="/empresas">Empresas</a>

        <a href="/products">Produtos</a>

      </nav>

      <button className="logout-btn" onClick={logout}>
        Sair
      </button>

    </header>
  );
}

export default Navbar;