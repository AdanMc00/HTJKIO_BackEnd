const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../../passport.js');

router.get('/auth/google/callback',passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {

    res.redirect('/');
  });


module.exports = router
