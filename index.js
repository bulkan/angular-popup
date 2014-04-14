var express = require('express')
  , http = require('http')
  , path = require('path')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// all environments
app.set('port', process.env.PORT || 3000);
app.use(bodyParser());


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('index');
});

app.get('/popup', function(req, res){
  res.render('popup');

});


app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
