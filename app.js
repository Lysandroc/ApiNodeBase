var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var cookieSession   = require('cookie-session');
var bodyParser      = require('body-parser');
var helmet          = require('helmet');
var compression     = require('compression');
var gzippo 		    = require('gzippo');
var util            = require('./util');

var app             = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Config
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieSession({secret: 'pmS3cret*'}));
app.disable('x-powered-by');
app.use(helmet());
app.use(gzippo.staticGzip(path.join(__dirname, 'public')));

//swagger
var swaggerJSDoc = require('swagger-jsdoc');
//generates .json file with swagger documentation
var options = {
  swaggerDefinition: {
    info: {
      title: 'ApiNodeBase', // Tittle (required)
      version: '1.0.0', // Version (required)
    },
  },  
  apis: util.listFilesFromFolder('./routes/'), // Path to the API docs
};

var swaggerSpec = swaggerJSDoc(options);

app.get('/api-docs.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

//display swaggerUI with .json file information
const swaggerUi = require('swagger-ui-express');
var options = {
    swaggerUrl: 'http://localhost:3000/api-docs.json'
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options));
//


/* Routes */
var index         = require('./routes/index');
app.use('/apibase', index);
var users         = require('./routes/users');
app.use('/apibase/users', users);
/* */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Address not found');
    err.status = 404;
    next(err);
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

// headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });

module.exports = app;
