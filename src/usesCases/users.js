const User = require('../models/users')

function getById (id) {
  return User.findOne({ 'provider_id': id })
}
module.exports = {

  getById

}

