const PORT = process.env.PORT || 8080,
  cluster = require('cluster'),
  numCPUs = require('os').cpus().length,
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

const webhookRouter = require('./routes/webhookRouter');

app.use(`/webhook`, webhookRouter);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());

// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(`/`, express.static(path.join(__dirname, '/public')));

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

var masterProcess = () => {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    console.log(`Forking process number ${i}...`);
    cluster.fork();
  }
}

var childProcess = () => {
  console.log(`Worker ${process.pid} started...`);
  http.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

if (cluster.isMaster)
  masterProcess();
else
  childProcess();


// http.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}`);
// });

