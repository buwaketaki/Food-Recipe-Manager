const express = require('express');

const router = express.Router();
const passport = require('passport');
//const passport_setup = require("../config/recSetup");

// auth login
router.get('/login', (req, res) => {
    res.render('login');
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
  
    res.redirect("/auth");
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/index');
    //console.log(req.body)

});

module.exports = router;