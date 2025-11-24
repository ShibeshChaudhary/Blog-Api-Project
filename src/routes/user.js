const express=require("express");
const router=express.Router();

const usercontroller=require("../controller/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.get("/users",authMiddleware,roleMiddleware("admin"),usercontroller.getAllUsers);
router.get("/:id",authMiddleware,usercontroller.getUserById);


module.exports = router;