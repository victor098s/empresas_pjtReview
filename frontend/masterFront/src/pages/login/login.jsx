import bgImage from "../../assets/img.jpg";
import logo from "../../assets/img.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Code, Globe, Lock, LogIn, Mail, User } from "lucide-react";

import api from "../../services/api";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, usuario } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(usuario));

      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao realizar login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="background-overlay"></div>

      <div className="card-wrapper">
        <div className="logo-wrap">
          <img src={logo} alt="TecSec Logo" />
        </div>

        <div className="glass-card">
          <div className="login-header">
            <h1>Acesse sua conta</h1>
            <p>Entre para continuar no painel</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <div className="input-control">
                <Mail size={18} aria-hidden="true" />
                <input
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Senha</label>
              <div className="input-control">
                <Lock size={18} aria-hidden="true" />
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && <span className="error">{error}</span>}

            <button className="login-btn" type="submit" disabled={loading}>
              <LogIn size={18} aria-hidden="true" />
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="divider">
            <span>ou continue com</span>
          </div>

          <div className="social-login">
            <button type="button">
              <Globe />
            </button>
            <button type="button">
              <User />
            </button>
            <button type="button">
              <Code />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
