const crypto = require('crypto')

//128 length
exports.getToken = () => {
    return crypto.randomBytes(64).toString('hex');
}