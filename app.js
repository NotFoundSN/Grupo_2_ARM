var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require("method-override");
const session = require("express-session");
let cors = require('cors');

/* //Rutas// */
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var carritoRouter = require('./routes/carrito');
var usuarioRouter = require('./routes/usuario');
var productoRouter = require('./routes/productos');
var apiRouter = require('./routes/api');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));
app.use(session({secret:"MoCGrupo2", user:{}}));

app.use(cors());

//Rutas
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/carrito', carritoRouter);
app.use('/usuario', usuarioRouter);
app.use('/productos', productoRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404', {req});
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {req});
});

module.exports = app;
