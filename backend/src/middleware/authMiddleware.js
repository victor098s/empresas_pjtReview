require("dotenv").config();
const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const secret = process.env.CHAVE_JWT;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token nao fornecido." });
  }

  if (!secret) {
    return res.status(500).json({ message: "Chave JWT nao configurada." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, secret);
    req.user = payload;
    return next();
  } catch (erro) {
    return res.status(401).json({ message: "Token invalido ou expirado." });
  }
}

function autorizarRoles(...rolesPermitidas) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Usuario nao autenticado." });
    }

    if (!rolesPermitidas.includes(req.user.role)) {
      return res.status(403).json({ message: "Acesso permitido apenas para admin." });
    }

    return next();
  };
}

module.exports = { verificarToken, autorizarRoles };
