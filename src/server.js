const express = require('express')
const json = express.json()
const cors = require('cors')
const morgan = require('morgan');
const passport = require('passport')
const  app = express()

app.use(passport.initialize());
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

const ideasRouter = require('./routes/ideas')
app.use('/ideas',passport.authenticate('jwt', {session : false}), ideasRouter)
const usersRouter = require('./routes/users')
app.use('/', usersRouter)

module.exports = app