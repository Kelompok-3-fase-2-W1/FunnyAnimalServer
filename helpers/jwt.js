const jwt = require('jsonwebtoken');

function jwtSign(payload) {
  const token = jwt.sign(payload, process.env.jwt_key)
  return token
}

function verifyToken(token) {
  const verifiedToken = jwt.verify(token, process.env.jwt_key);

  return verifiedToken
}



module.exports = { jwtSign, verifyToken }