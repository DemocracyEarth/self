const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const path = require('path');
const engines = require('consolidate');;

const CryptoJS = require("crypto-js");
const AES = require("crypto-js/aes");
const SHA256 = require("crypto-js/sha256");
const randomstring = require("randomstring");

var server = require('http').createServer(app);
var io = require('socket.io')(server);

let users = [];
const Message = require('bitcore-message');
/***************************************************
* This section is related to the webpage
****************************************************/

io.on('connection', function(socket){

  let randomToken = randomstring.generate();
  let randomString = randomstring.generate();
  console.log(`connected socket.id ${socket.id} with token: ${randomToken} url:${serverURL}`);
   // add user to the users array
  users.push({ id: socket.id, token: randomToken, secretStr: randomString});
  /*
  *  send token and server url to the webpage instance
  *  that belongs to the user connected in socket = socket.id
  */
  io.to(socket.id).emit('receive-token', {token: randomToken, url: serverURL});

  socket.on('disconnect',function(){
    for(var i=0;i<users.length;i++){
      if(users[i].id==socket.id){
        users.splice(i,1); //Removing single user
      }
    }
  });
  /**
   * refresh QR code button from user connected
   * in socket = socket.id
   */

  socket.on('generate-token',function(){
    for(var i=0;i<users.length;i++){
      if(users[i].id==socket.id){
        let randomToken = randomstring.generate();
        let randomString = randomstring.generate();
        console.log(`connected socket.id ${socket.id} asked new token: ${randomToken} url:${serverURL}`);
        users[i].token = randomToken;
        users[i].secretStr = randomString;
        // send token and server url to the user webpage
        io.to(socket.id).emit('receive-token', {token: randomToken, url: serverURL});
      }
    }
  });
});

const port = process.env.PORT || 8080;
server.listen(port);
let serverURL
if(process.env.NODE_ENV === 'production'){
  // replace here with your qrcode generator URL
  serverURL = 'https://selfdemo.herokuapp.com';
} else {
  serverURL = 'http://localhost:'+port;
}

app.set('view engine', 'html')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.set('views', path.join(__dirname, '/public'));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.redirect('index.html');
});
app.get('/users', (req, res) => {
  res.send({users:users});
});

/***************************************************
* This section is realted to the mobile application
****************************************************/
/**
 * Receive a Public key and send a secret string to be signed by the Key owner
 */
app.post('/public-key', (req, res) => {
  let tokenin = req.body.token;
  let publicKey = req.body.publickey;
  let nouser = true;
  for(var i=0;i<users.length;i++){
    if(users[i].token === tokenin){
      nouser = false;
      console.log(`id ${users[i].id} token: ${tokenin} public Key: ${publicKey}, secretStr: ${users[i].secretStr}`);
      users[i].publicKey = publicKey;
      res.send({ secretstr: users[i].secretStr, status: 'public-key-ok'});
      break;
    }
  }
  // send login error to the mobile app
  if(nouser){
    res.send({login:'err-user not found'});
  }
});
app.post('/secret-msg', (req, res) => {
  let tokenin = req.body.token;
  let signedMsg = req.body.signedMsg;
  let nouser = true;
  for(var i=0;i<users.length;i++){
    if(users[i].token === tokenin){
      nouser = false;
      let verified = new Message(users[i].secretStr).verify(users[i].publicKey, signedMsg);
      console.log("verified",verified);
      if(verified){
        console.log(`validated socket.id ${users[i].id} token: ${tokenin} user info: ${req.body.userinfo}`);
        // send ok to the user webpage connected in the socket = users[i].id
        io.to(users[i].id).emit('auth-ok', req.body.userinfo);
        users.splice(i,1); //Removing single user
        // send login ok to the mobile app
        res.send({status:'login-ok'});
        /**
         * SAVE USER DATA:
         * - public key
         * - token access
         * - user information
         */
        break;
      } else{
        console.log("error signature invalid");
        // send login error to the mobile app
        res.send({status:'err - signature invalid'});
      }

    }
  }
  // send login error to the mobile app
  if(nouser){
    res.send({status:'err-user not found'});
  }
});
