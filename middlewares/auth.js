const { verifyToken } = require('../helpers/jwt.js')
const { User } = require('../models/index');
const { cat } = require('../controllers/controller.js');


async function authentication(req, res, next) {

  let token = req.headers.token;
  
  // console.log('ini token: ', token)
  

  if (!token) {
    next({
      name: `Internal Server Error`,
      errors: `Invalid token`
    })
  } else {

    try {
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
        req.userLogin = dataUser
        next()
      }
    } catch (err) {
      next({
        name: `Internal Server Error`,
        errors: `Invalid token`
      })
    }
  }

}

module.exports = { authentication } 