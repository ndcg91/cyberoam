//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var express             = require('express');
var app                 = express();
var server              = require('http').createServer(app);
var io                  = require("socket.io").listen(server);
var bodyParser          = require('body-parser');
var port                = process.env.PORT || 8080;
var client              = require('./modules/mysql.js');
var macfromip           = require('macfromip');
var bodyParser 	 	= require('body-parser');
var morgan              = require('morgan');
var router 		= express.Router();




//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//


io.on('connection', function (socket) {
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials','true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers,X-Requested-With, Content-Type, Accept');
  res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

app.use('/api',router);

router.use(function(req, res, next) {
  console.log("algo ha pasado");
  next();
});

router.get('/', function(req, res) {
  res.json({message: 'ok api set'});
});

router.route('/user/')
  .post(function(req,res){
    var user = req.body.username;
    var password = req.body.password;
    var ip = (req.ip).split(":")[0].trim();
    console.log(ip);
    macfromip.getMac(ip, function(err, data){
      if(err){
        console.log(err);
        res.send(403)
      }
      console.log(data);
      var mac = data;
      client.login(user,password).then(function(res){
        res.send(200)
      },function(err){
        res.send(403)
      })
    });
  })

server.listen(port);
console.log("ok api set");
