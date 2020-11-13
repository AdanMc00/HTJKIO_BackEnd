
const mongoose = require('mongoose')

const ideasSchema = new mongoose.Schema({

  title: {
    type: String,
    minlength: 2,
    maxlength: 100,
    required: true,
    trim: true
  },
  author: {
    type: String,
    minlength: 2,
    maxlength: 100,
    required: true,
    trim: true
  },
  dateCreate: {
    type: Date,
    required: false,
    default: new Date()
  },
  imageUrl:{
    type: String,
    minlength: 5,
    maxlength: 500
  },
  description:{
    type: String,
    minlength: 5,
    maxlength: 500
  }
})

module.exports = mongoose.model('Ideas', ideasSchema)