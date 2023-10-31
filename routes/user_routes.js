const express = require('express');
const router = express.Router();
const {getAllUser, singup, login, getByEamil, UpdateUser} = require('../controllers/userController')

router.get('/', getAllUser);
router.get('/:email', getByEamil);
router.put('/:id', UpdateUser)
router.post('/signup',singup);
router.post('/login', login);

module.exports = router