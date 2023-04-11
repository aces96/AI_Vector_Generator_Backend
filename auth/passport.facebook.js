


const User = require('../models/user.model');
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;


passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });



passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8080/auth/facebook/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    const user = await User.findOne({ account_id: profile.id });
        if(user){   
            const newUserData = {
                name: profile.displayName,
                account_id: profile.id,
            };

            const updateUser = await User.findOneAndUpdate({_id: user.id}, newUserData, {new: true}).then((result)=>{
                return cb(null,result);
            })
        }else{

          console.log("yowwwwww", profile);
            const newUser = new User({
                name: profile.displayName,
                account_id: profile.id,
            })

            await newUser.save().then((result)=>{
                return cb(null,result);
            })
        }
  }
));