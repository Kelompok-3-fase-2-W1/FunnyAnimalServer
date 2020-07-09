const { verifyToken } = require('../helpers/jwt.js')
const { User } = require('../models/index')


async function authentication(req, res, next) {

  let token = req.headers.token;

  if (!token) {
    next({
      name: `Internal Server Error`,
      errors: err.message
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
      next({
        name: `Internal Server Error`,
        errors: err.message
      })
    }
    else {
      userLogin = dataUser
      next()
    }
  }

}

module.exports = { authentication } 