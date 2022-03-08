//module to hashing ( and sale ) password

var bcrypt = require('bcrypt')

exports.encrypt = (secret_value) => {
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(secret_value, salt)
    return hash
}

exports.decrypt = (insert_value, hash) => {
    //value returned is true or false
    return bcrypt.compareSync(insert_value, hash)
}
