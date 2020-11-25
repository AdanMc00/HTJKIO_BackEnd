const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({

  email: {
    type: String,
    minlength: 5,
    maxlength: 500,
    required: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
  },
   name: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: true
  },
  provider: {
    type: String
  },
  provider_id: {
    type: String,
    unique: true
  },
  photo: {
    type: String,

  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  admin: {
    type: Boolean,
    default: false
  },
})


const Users = mongoose.model('Users',usersSchema);
module.exports = Users;