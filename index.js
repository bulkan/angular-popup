var express = require('express')
  , http = require('http')
  , path = require('path')
  , csrf = require('csurf')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.use(bodyParser());
app.use(cookieParser('secret key'));


app.disable('x-powered-by');

// Angular sends CSRF token using X-XSRF-TOKEN header
var csrfValue = function(req) {
  var token = (req.body && req.body._csrf)
    || (req.query && req.query._csrf)
    || (req.headers['x-csrf-token'])
    || (req.headers['x-xsrf-token']);
  return token;
};

app.use(csrf({value: csrfValue}));

// Angular's $http service looks for XSRF-TOKEN cookie to get the csrf token
app.use(function(req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
});

app.use(express.static(path.join(__dirname, 'public')));


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

