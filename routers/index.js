const express = require('express')
const router = express.Router()
const { authentication } = require('../middlewares/auth.js')

const Controller = require('../controllers/controller.js')

router.post('/register', Controller.userRegister)
router.post('/login', Controller.userLogin)
router.get('/cat', authentication, Controller.cat)
router.get('/dog', authentication, Controller.dog)
router.get('/fox', authentication, Controller.fox)

module.exports = router