const express = require('express')
const router = express.Router()
const { authentication } = require('../middlewares/auth.js')

const Controller = require('../controllers/controller.js')

router.post('/register', Controller.userRegister)
router.post('/login', Controller.userLogin)
<<<<<<< HEAD
router.get('/cat', Controller.cat)
router.get('/dog', Controller.dog)
router.get('/fox', Controller.fox)
=======
router.get('/cat', authentication, Controller.cat)
router.get('/dog', authentication, Controller.dog)
router.get('/fox', authentication, Controller.fox)
>>>>>>> 76382cbbf0275489dfa36b4cde610a9e9bc621a6

module.exports = router