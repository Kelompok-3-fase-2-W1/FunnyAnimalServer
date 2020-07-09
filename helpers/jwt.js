const jwt = require('jsonwebtoken');

function jwtSign(payload) {
  const token = jwt.sign(payload, 'danilpanjifiah')
  return token
}

function verifyToken(token) {
  const verifiedToken = jwt.verify(token, "danilpanjifiah");

  return verifiedToken
}



module.exports = { jwtSign, verifyToken }