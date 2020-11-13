const express = require('express')
const cors = require('cors')
const ideasRouter = require('./routes/ideas')
const usersRouter = require('./routes/users')
const passport = require('passport')
const app = express()
app.use(passport.initialize());
app.use(passport.session());
app.use('/ideas', ideasRouter)
app.use('/users', usersRouter)
app.use(cors())
app.use(express.json())


module.exports = app