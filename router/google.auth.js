const express = require('express');
const router = express.Router();
const passport = require('passport')


router.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }),
  function(req, res) {
    console.log(req.user);
    // Successful authentication, redirect home.
    
    res.redirect(`http://localhost:5173/success?email=${req.user.email}&name=${req.user.name}&image=${req.user.image}&id=${req.user.id}&tokens=${req.user.tokens}`);
});


module.exports = router