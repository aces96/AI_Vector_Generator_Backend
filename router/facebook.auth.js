const express = require('express');
const router = express.Router();
const passport = require('passport')


router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: 'https://cncvectorlab.com/login' }),
  function(req, res) {
    console.log("heeeeeey", req.user);
    // Successful authentication, redirect home.
    res.redirect(`https://cncvectorlab.com/success?id=${req.user.id}&name=${req.user.name}&tokens=${req.user.tokens}&image=${req.user.image}`);
  });




module.exports = router