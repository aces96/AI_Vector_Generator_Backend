const express = require('express');
const passport = require('passport');
const router = express.Router();



router.get('/linkedin', passport.authenticate('linkedin', {state: 'LSKDFJ'}))

router.get('/linkedin/callback',
passport.authenticate("linkedin", {
    failureRedirect: 'https://cncvectorlab.com/login'
}), (req,res)=>{
    console.log('uuuuuusssssseeerr', req.user);
    res.redirect(`https://cncvectorlab.com/success?name=${req.user.name}&id=${req.user.id}&picture=${req.user.image}&tokens=${req.user.tokens}`);
})

router.get("/login/success", (req)=>{
    console.log('teeeeessst', req.user);
    if(req.user){
        res.json({
            user: user
        })
    }
})

module.exports =router