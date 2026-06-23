const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const secret = process.env.CHAVE_JWT;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Os campos de email e senha sao obrigatorios." });
    }

    if (!secret) {
      return res.status(500).json({ message: "Chave JWT nao configurada." });
    }

    const result = await pool.query(
      "SELECT email, senha, COALESCE(role, 'user') AS role FROM users WHERE email = $1",
      [email],
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Usuario invalido." });
    }

    const senhaValida = await bcrypt.compare(password, user.senha);

    if (!senhaValida) {
      return res.status(401).json({ message: "Senha invalida." });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      secret,
      { expiresIn: "30min" },
    );

    return res.status(200).json({
      token,
      usuario: { email: user.email, role: user.role },
    });
  } catch (erro) {
    return res.status(500).json({
      message: "Nao foi possivel logar.",
      erro: erro.message,
    });
  }
}

module.exports = { login };
