const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user');
passport.serializeUser((user,done)=>{
    done(null,user.id);
  });
  
  passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
      done(null,user);
  
    })})
passport.use(

        new GoogleStrategy({
            // options for google strategy
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: '/auth/google/redirect'
        }, (accessToken,refreshToken,profile,done) => {
            // passport callback function
            User.findOne({googleId:profile.id})
                .then((currentUser)=>{
                  if(currentUser){
                    console.log("user exist");
                    done(null,currentUser);
                  }else{
                    new User({
                      username : profile.displayName,
                      googleId : profile.id,
                      
                    }).save()
                    .then((newUser)=>{
                      console.log("user created "+ newUser);
                      done(null,newUser);
                    })
                  }
                })
        })
    );
