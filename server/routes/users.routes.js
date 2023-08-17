const { Router } = require('express')
const router = Router()

const userCtrl = require('../controllers/user.controller.js')

router.get('/dataProfile', userCtrl.getUserData);

router.get('/', userCtrl.getUsers);

router.post('/', userCtrl.createUser);

router.get('/:id', userCtrl.getUser);

router.put('/:id', userCtrl.updateUser);

router.delete('/:id', userCtrl.deleteUser);

router.post('/login', userCtrl.login);

router.post('/register', userCtrl.register);

module.exports = router