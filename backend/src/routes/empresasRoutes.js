const express = require("express");
const router = express.Router();
const empresasControllers = require("../controllers/empresasControllers");
const { autorizarRoles } = require("../middleware/authMiddleware");

router.get("/", empresasControllers.listarTodos);
router.post("/", autorizarRoles("admin"), empresasControllers.criar);
router.put("/:id", autorizarRoles("admin"), empresasControllers.atualizar);
router.delete("/:id", autorizarRoles("admin"), empresasControllers.deletar);

module.exports = router;
