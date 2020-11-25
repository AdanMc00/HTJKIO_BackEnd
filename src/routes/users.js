const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
require('../../google-oauth')
const router = express.Router()
const user = require('../usesCases/users')

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('https://mail.google.com/mail/u/0/?logout&hl=en')

})

router.get('/auth/google/callback', passport.authenticate('sign-in-google', { failureRedirect: '/login' }),
  function (req, res) {

    const idprov = req.user.provider_id
    if (req.user) {
      const token = jwt.sign({ id: req.user.provider_id }, 'top_secret', {
        expiresIn: 60 * 60 * 24
      })
      res.cookie('token', token)
      res.cookie('idprov', idprov)
      console.log(req.user.provider_id)
      res.redirect('http://localhost:3000/ideas')

    } else {
      res.redirect('http://localhost:3000/')
    }
  }
)
router.get('/auth/google/signup', passport.authenticate('sign-up-google', {
    scope: ['https://www.googleapis.com/auth/plus.login'],
    session: false
  }),
  function (req, res) {
    if (req.user) {
      const token = jwt.sign({ id: req.user._id }, 'top_secret', {
        expiresIn: 60 * 60 * 24 // equivalente a 24 horas
      })
      res.cookie('token', token)
      res.redirect('http://localhost:3000/ideas')
    } else {
      res.redirect('http://localhost:3000/')
    }
  }
)
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const userFound = await user.getById(id)
    res.json({
      success: true,
      message: 'user by provider_id',
      data: {
        user: userFound
      }
    })
  } catch (error) {
    res.status(400),
      res.json({
        success: false,
        message: error.message
      })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const userFound = await user.getById(id)
    res.json({
      success: true,
      message: 'user by provider_id',
      data: {
        user: userFound
      }
    })
  } catch (error) {
    res.status(400),
      res.json({
        success: false,
        message: error.message
      })
  }
})

router.post('/', async (request, response) => {
  try {
    const userCreated = await user.create(request.body)
    response.json({
      success: true,
      message: 'user create',
      data: {
        user: userCreated
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      message: 'error.message'
    })
  }
})
router.delete('/:id', (request, response) => {
  try {
    const { id } = request.params
    const userDeleted = user.deleteById(id)
    response.json({
      success: true,
      message: 'deleted',
      data: {
        user: userDeleted
      }
    })
  } catch (error) {
    response.status(400),
      response.json({
        success: false,
        message: error.message
      })
  }
})

module.exports = router
