const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productsControllers");

router.get("/", productControllers.listarTodos);
router.post("/", productControllers.criar);
router.put("/:id", productControllers.atualizar);
router.delete("/:id", productControllers.deletar);

module.exports = router;
