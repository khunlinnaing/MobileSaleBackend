const express = require('express');
const router = express.Router();
const {getAllUser, singup, login, getByEamil, UpdateUser, getById, DeleteUser} = require('../controllers/userController')

router.get('/', getAllUser);
router.get('/info/:id', getById);
router.get('/:email', getByEamil);
router.put('/:id', UpdateUser)
router.post('/signup',singup);
router.post('/login', login);
router.delete('/:id', DeleteUser)

module.exports = router