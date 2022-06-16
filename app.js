const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const app = express();

const indexRouter = require('./routes');
const topRouter = require('./routes/top');
const deleteRouter = require('./routes/delete');
const mypageRouter = require('./routes/mypage');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));

const session_opt = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cokkie:{maxAge: 60 * 60 * 1000}
}
app.use(session(session_opt));

app.use('/', indexRouter);
app.use('/top', topRouter);
app.use('/delete', deleteRouter);
app.use('/mypage', mypageRouter);
app.get('/logout',(req,res)=>{
  req.session.destroy((err)=>{
    res.redirect('/');
  });
});

// catch 404 and forward to error handler
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

module.exports = app;
