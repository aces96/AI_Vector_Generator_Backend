const express = require('express');
const router = express.Router();
const passport = require('passport')


router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("heeeeeey", req.user);
    // Successful authentication, redirect home.
    res.redirect(`http://localhost:5173/success?id=${req.user.account_id}&name=${req.user.name}&tokens=${req.user.tokens}&image=${req.user.image}`);
  });




module.exports = router