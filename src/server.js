const express = require('express')
const cors = require('cors')
const passport = require('passport')
const app = express()
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())
app.use(express.json())

module.exports = app