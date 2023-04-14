const express = require('express');
const router = express.Router();
const passport = require('passport')


router.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: 'https://urchin-app-gbing.ondigitalocean.app/login' }),
  function(req, res) {
    console.log(req.user);
    // Successful authentication, redirect home.
    
    res.redirect(`https://urchin-app-gbing.ondigitalocean.app/success?email=${req.user.email}&name=${req.user.name}&image=${req.user.image}&id=${req.user.id}&tokens=${req.user.tokens}`);
});


module.exports = router