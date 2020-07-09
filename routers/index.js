const express = require('express')
const router = express.Router()

const Controller = require('../controllers/controller.js')

router.post('/register', Controller.userRegister)
router.post('/login', Controller.userLogin)
router.post('/cat', Controller.cat)
router.post('/dog', Controller.dog)
router.post('/fox', Controller.fox)

module.exports = router