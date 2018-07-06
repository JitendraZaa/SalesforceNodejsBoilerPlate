var express = require('express'),
    http = require('http'), 
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express();
	
var https = require('https');
var fs = require('fs');
var nforce = require('nforce');
 
	
var logFmt = require("logfmt");

app.use(express.static(__dirname + '/client')); 

app.use(bodyParser.json());  

app.set('port', process.env.PORT || 8080);

var oauth;


var org = nforce.createConnection({
    clientId: '3MVG9iTxZANhwHQuSJa6AuCgprwyLBe_FcBg8FnmJV6bACvlOItdKQp5s7dzQBDRb.zgswMjUnWD6SHzfp93A',
    clientSecret: '1958599006192243495',
    redirectUri: 'http://localhost:8080/auth/sfdc/callback',
    apiVersion: 'v43.0',  // optional, defaults to current salesforce API version
    environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
    mode: 'multi' // optional, 'single' or 'multi' user mode, multi default
  });

  app.get('/auth/sfdc', function(req,res){
    res.redirect(org.getAuthUri());
  });

app.get('/auth/sfdc/callback', function(req, res) {
    console.log('** I am In**');
    org.authenticate({code: req.query.code}, function(err, resp){
      if(!err) {
        console.log('Access Token: ' + resp.access_token);
        oauth = resp;
        res.sendfile('views/Main.html');
      } else {
        console.log('Error: ' + err.message);
      }
    });
  });
 
app.get('/' ,  function(req,res) {
    res.sendfile('views/index.html');
} ); 

app.get('/index*' ,  function(req,res) {
    res.sendfile('views/index.html');
} );  
  

app.get('/Main*' ,   function(req,res) {
    res.sendfile('views/Main.html');
} );
 

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

	var options = {
      key: fs.readFileSync('./key.pem', 'utf8'),
      cert: fs.readFileSync('./server.crt', 'utf8')
   };
   
	https.createServer(options, app).listen(8081);
	console.log("Server listening for HTTPS connections on port ", 8081);