const bcrypt = require(`bcryptjs`);
const salt = bcrypt.genSaltSync(8);

function hashingPassword(password) {
<<<<<<< HEAD
    
=======
>>>>>>> 76382cbbf0275489dfa36b4cde610a9e9bc621a6
    const hash = bcrypt.hashSync(password, salt);
    return hash
}


function comparePassword(password, hash) {

    const result = bcrypt.compareSync(password, hash)
    return result;
}

// console.log(comparePassword("12345", "$2a$08$jIreL4ZUWDHIp72.0SoJael8NGdX82GJsMMbnwieckdoG2VBAEDI."));

module.exports = {
    hashingPassword,
    comparePassword
}