const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productsControllers");
const { autorizarRoles } = require("../middleware/authMiddleware");

router.get("/", productControllers.listarTodos);
router.post("/", autorizarRoles("admin"), productControllers.criar);
router.put("/:id", autorizarRoles("admin"), productControllers.atualizar);
router.delete("/:id", autorizarRoles("admin"), productControllers.deletar);

module.exports = router;
