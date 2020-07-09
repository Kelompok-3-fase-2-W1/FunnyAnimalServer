const { verifyToken } = require('../helpers/jwt.js')
const { User } = require('../models/index')


async function authentication(req, res, next) {

  let token = req.headers.token;

  if (!token) {
    res.status(500).json({
      message: 'Silahkan login terlebih dahulu'
    })
  }
  else {
    const payload = verifyToken(token)

    // console.log(payload)

    const dataUser = await User.findOne({
      where: {
        email: payload.email
      }
    })

    if (!dataUser) {
      res.status(500).json({
        message: 'silahkan login terlebih dahulu'
      })
    }
    else {
      userLogin = dataUser
      next()
    }
  }

}

module.exports = { authentication } 