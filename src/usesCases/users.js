const User = require('../models/users')

function getById (id) {
  return User.findOne({ 'provider_id': id })
}

function adGetById (id) {
  return User.findOne(id)
}

function create ({
  name,
  email,
  provider,
  provider_id,
  photo,
  createdAt,
  admin
}) {
  const newUSer = new User({
    name,
    email,
    provider,
    provider_id,
    photo,
    createdAt,
    admin
  })
  return newUSer.save()
}

function deleteById (id) {
  return User.findByIdAndDelete(id)
}

module.exports = {
  adGetById,
  getById,
  create,
  deleteById
}

