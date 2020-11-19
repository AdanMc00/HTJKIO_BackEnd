const express = require('express');
const passport = require('passport');
const jwt = require ('jsonwebtoken');
require ('../../google-oauth')
const router = express.Router();

router.get('/auth/google/callback',passport.authenticate('sign-in-google', { failureRedirect: '/login' }),
  function(req, res) {
    if (req.user) {
      const token = jwt.sign({id: req.user.provider_id}, 'top_secret', {
        expiresIn: 60 * 60 * 24
      })
      res.cookie('token', token)

      res.redirect('/ideas');
  } else {
      res.redirect('/');
   }
  }
);
router.get('/auth/google/signup',passport.authenticate('sign-up-google', {scope: ['https://www.googleapis.com/auth/plus.login'], session: false }),
  function(req, res) {
    if (req.user) {
      const token = jwt.sign({id: req.user._id}, 'top_secret', {
        expiresIn: 60 * 60 * 24 // equivalente a 24 horas
      })
      res.cookie('token', token)
      res.redirect('/ideas')
    } else {
      res.redirect('/');
    }
 }
  );



module.exports = router
