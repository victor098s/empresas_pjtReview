const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const empresasRoutes = require("./src/routes/empresasRoutes");
app.use(express.json());
app.use(cors());
app.use("/empresas", empresasRoutes);

app.listen(port, () => {
  console.log("====================================================");
  console.log(`\n🚀 Servidor rodando em: http://localhost:${port}/\n`);
  console.log("====================================================");
});
