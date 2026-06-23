const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const empresasRoutes = require("./src/routes/empresasRoutes");
const productsRoutes = require("./src/routes/productsRoutes");
const viewRouter = require("./src/routes/viewRoutes");
app.use(express.json());
app.use(cors());
app.use("/empresas", empresasRoutes);
app.use("/produtos", productsRoutes);
app.use("/viewProd", viewRouter);

app.listen(port, () => {
  console.log("====================================================");
  console.log(`\n🚀 Servidor rodando em: http://localhost:${port}/\n`);
  console.log("====================================================");
});
