import "./Navbar.css";

function Navbar() {

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  return (
    <header className="navbar">

      <div className="logo">
        <h2>RedBear Companies</h2>
      </div>

      <nav>

        <a href="/home">Home</a>

        <a href="/empresas">Empresas</a>

        <a href="/produtos">Produtos</a>

      </nav>

      <button className="logout-btn" onClick={logout}>
        Sair
      </button>

    </header>
  );
}

export default Navbar;
