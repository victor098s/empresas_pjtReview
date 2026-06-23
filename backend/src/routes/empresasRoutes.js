const express = require("express");
const router = express.Router();
const empresasControllers = require("../controllers/empresasControllers");

router.get("/", empresasControllers.listarTodos);
router.post("/", empresasControllers.criar);
router.put("/:id", empresasControllers.atualizar);
router.delete("/:id", empresasControllers.deletar);

module.exports = router;
