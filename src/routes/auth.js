const express=require('express');
const router=express.Router();

const registerController=require('../controller/register');
const loginController=require('../controller/login');

router.post('/register',registerController.register);
router.post('/login',loginController.login);

module.exports=router;