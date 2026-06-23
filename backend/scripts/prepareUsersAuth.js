const bcrypt = require("bcrypt");
const pool = require("../src/config/database");

const saltRounds = 10;
const adminEmail = process.env.ADMIN_EMAIL;

function isBcryptHash(password) {
  return /^\$2[aby]\$\d{2}\$/.test(password);
}

async function ensureRoleColumn() {
  await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user'");
  await pool.query("UPDATE users SET role = 'user' WHERE role IS NULL");
}

async function defineAdminRole() {
  await pool.query("UPDATE users SET role = 'user'");

  if (!adminEmail) {
    const adminUser = await pool.query(
      "SELECT email FROM users WHERE email ILIKE '%admin%' ORDER BY email LIMIT 1",
    );
    const fallbackUser = adminUser.rowCount > 0
      ? adminUser
      : await pool.query("SELECT email FROM users ORDER BY email LIMIT 1");

    if (fallbackUser.rowCount > 0) {
      await pool.query("UPDATE users SET role = 'admin' WHERE email = $1", [
        fallbackUser.rows[0].email,
      ]);
      console.log(`ADMIN_EMAIL nao informado. Admin definido como: ${fallbackUser.rows[0].email}`);
    }

    return;
  }

  const result = await pool.query("UPDATE users SET role = 'admin' WHERE email = $1", [
    adminEmail,
  ]);

  if (result.rowCount === 0) {
    console.log(`Nenhum usuario encontrado com ADMIN_EMAIL=${adminEmail}`);
  } else {
    console.log(`Admin definido como: ${adminEmail}`);
  }
}

async function hashPlainTextPasswords() {
  const users = await pool.query("SELECT email, senha FROM users");

  for (const user of users.rows) {
    if (isBcryptHash(user.senha)) {
      continue;
    }

    const hashedPassword = await bcrypt.hash(user.senha, saltRounds);
    await pool.query("UPDATE users SET senha = $1 WHERE email = $2", [
      hashedPassword,
      user.email,
    ]);
    console.log(`Senha criptografada para: ${user.email}`);
  }
}

async function main() {
  await ensureRoleColumn();
  await defineAdminRole();
  await hashPlainTextPasswords();
  await pool.end();
  console.log("Usuarios preparados para JWT com role e bcrypt.");
}

main().catch(async (error) => {
  console.error(error.message);
  await pool.end();
  process.exit(1);
});
