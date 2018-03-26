const express = require('express')
const router = express.Router()

const{ createUser, loginuser } = require('../controllers/registration.controller')

router.post('/signup', createUser)
router.post('/login', loginuser)


module.exports = router