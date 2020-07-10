const bcrypt = require(`bcryptjs`);
const salt = bcrypt.genSaltSync(8);

function hashingPassword(password) {
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

function comparePassword(password, hash) {
    const result = bcrypt.compareSync(password, hash)
    return result;
}

module.exports = {
    hashingPassword,
    comparePassword
}