const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/register', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/', userCtrl.edit);
router.delete('/', userCtrl.delete);

module.exports = router;