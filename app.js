var createError = require('http-errors');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
var logger = require('morgan');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require("passport");
const keys = require('./config/keys');
var app = express();

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth")
const passport_setup = require("./config/recSetup");
const commentRouter = require("./routes/comments");
const  flash       = require("connect-flash");
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', adminRoutes);
app.use('/auth', authRoutes);
app.use('/showDescription/:id/comments', commentRouter);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   
  // console.log("User",req.user);
  next();
});


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');


});

mongoose
  .connect(
    'mongodb+srv://ketaki:ketaki1998@cluster0-drcdi.mongodb.net/Recipes?retryWrites=true&w=majority', {
      useNewUrlParser : true,
      useUnifiedTopology: true
    }
   
  ).then(app.listen(3002)).catch(err => {
    console.log(err);
  });




  