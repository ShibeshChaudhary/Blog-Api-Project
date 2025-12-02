const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  getMyProfile
} = require("../controller/userController"); 
const verifyToken = require("../middlewares/authMiddleware"); 
const { allowRoles } = require("../middlewares/checkRole");

 
router.get("/", verifyToken, allowRoles("admin"), getAllUsers); 
router.get("/me", verifyToken, getMyProfile);
router.get("/:id", verifyToken, allowRoles("admin", "editor"), getUserById);

module.exports = router;
