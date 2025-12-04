const express = require('express');
const router = express.Router();

const registerController = require('../controller/register');
const loginController = require('../controller/login');
const userController = require('../controller/userController');   
const authenticate = require('../middlewares/authMiddleware');     
 
router.post('/register', registerController.register);
router.post('/login', loginController.login);

router.post('/auth/verify', authenticate, (req, res) => {
  res.json({ verified: true, user: req.user });
});

router.get('/users', authenticate, userController.getAllUsers);
router.delete('/users/:id', authenticate, userController.deleteUser);
router.get('/users/me',authenticate,userController.getMyProfile);



module.exports = router;
