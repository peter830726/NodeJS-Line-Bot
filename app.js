const PORT = process.env.PORT || require('./config/constant').PORT,
  helmet = require('helmet'),
  co = require('co'),
  express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  expressValidator = require('express-validator'),
  cors = require('cors'),
  app = express(),
  http = require('http').Server(app);

const webhookRouter = require('./routes/webhookRouter'),
  adminRouter = require('./routes/adminRouter'),
  lineLoginRouter = require('./routes/lineLoginRouter'),
  notifyRouter = require('./routes/notifyRouter');

app.use(helmet());
app.use(`/webhook`, webhookRouter);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());

// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(`/`, express.static(path.join(__dirname, '/public/dist')));

//router
app.use(`/admin`, adminRouter);
app.use(`/notify`, notifyRouter);
app.use(`/lineLogin`, lineLoginRouter);

app.use((err, req, res, next) => {
  logger.apply({ 'err': err });
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

http.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});