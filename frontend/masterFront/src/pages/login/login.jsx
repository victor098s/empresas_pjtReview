import bgImage from "../assets/img.jfif";
import logo from "../assets/img.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaFacebookF,
  FaGithub,
} from "react-icons/fa";

import api from "../services/api";
import "../styles/login.css";

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

      const response = await api.post("/login", {
        email,
        password,
      });

      const { token, usuario } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(usuario));

      navigate("/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Erro ao realizar login"
      );
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
      <div className="background-blur one"></div>
      <div className="background-blur two"></div>

      <div className="card-wrapper">

        <div className="logo-wrap">
          <img src={logo} alt="TecSec Logo" />
        </div>

        <div className="glass-card">

          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Login to continue</p>
          </div>

          <form onSubmit={handleLogin}>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <span className="error">{error}</span>
            )}

            <button
              className="login-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Login"}
            </button>

          </form>

          <div className="divider">
            <span>ou continue com</span>
          </div>

          <div className="social-login">
            <button type="button"><FaGoogle /></button>
            <button type="button"><FaFacebookF /></button>
            <button type="button"><FaGithub /></button>
          </div>

        </div>
      </div>
    </div>
  );
}