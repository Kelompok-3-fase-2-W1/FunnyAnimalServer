const express = require('express')
const router = express.Router()

const Controller = require('../controllers/controller.js')

router.post('/register', Controller.userRegister)
router.post('/login', Controller.userLogin)
router.get('/cat', Controller.cat)
router.get('/dog', Controller.dog)
router.get('/fox', Controller.fox)

module.exports = router