var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const passport = require('passport')
const dotenv = require('dotenv').config();
const User = require('../models/user.model')

passport.serializeUser((user, done)=>{
    done(null,user)
})
passport.deserializeUser((user, done)=>{
  User.findById(id, function (err, user) {
    done(err, user);
  });
})

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_KEY,
  clientSecret: process.env.LINKEDIN_SECRET,
  callbackURL: "http://localhost:8080/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_liteprofile'],
},
 async function(accessToken, refreshToken, profile, done) {
  const user = await User.findOne({ account_id: profile.id });
      if(user){   
        const newUserData = {
            name: profile.displayName,
            email: profile.emails[0].value,
            account_id: profile.id,
            image: profile.photos[2].value,
        };

        const updateUser = await User.findOneAndUpdate({_id: user.id}, newUserData, {new: true}).then((result)=>{
            return done(null,result);
        })
    }else{
        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          account_id: profile.id,
          image: profile.photos[2].value,
        })

        await newUser.save().then((result)=>{
            return done(null,result);
        })
    }
}));