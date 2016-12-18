angular.module('self.controllers', [])
.controller('ScannerCtrl', function($scope,$http, $rootScope, $cordovaBarcodeScanner, SelfCache, KeyCache) {
  var infoFromServer;
  var vm = this;
  var bitcore = require('bitcore-lib');
  var Message = require('bitcore-message');
  vm.scanvalid = false;
  vm.error = false;
  vm.loginok = false;
  vm.scan = function(){
    vm.loginok = false;
    $cordovaBarcodeScanner
      .scan()
      .then(function(result) {
          // Success! Barcode data is here
          infoFromServer = JSON.parse(result.text);
          vm.scanResults =  infoFromServer;
          vm.scanResults.format = result.format;
          vm.scanvalid = true;
          vm.error = false;
          console.log("scan ok", result);
      }, function(error) {
          // An error occurred
          vm.scanvalid = false;
          vm.error = true;
          vm.errormsg = 'Error: ' + error;
          console.log("scan error", error);
      });
  };

  vm.scanResults = '';
  vm.login = function() {
    var user = SelfCache.get('userdata');
    var publicKey = KeyCache.getPublicKey();
    var privateKey = KeyCache.getPrivateKey();

    function signMsgValidateIdentity(secretStr){
      var secretKey = bitcore.PrivateKey.fromWIF(privateKey);
      var signature = Message(secretStr).sign(secretKey);


      console.log("secretStr: " + secretStr + "- secretKey: " + secretKey + "- signature:" + signature);
      $http.post( infoFromServer.api+'/secret-msg', {token: infoFromServer.token, signedMsg: signature , userinfo: user})
      .success(function(data, status){
         if(data.status === 'login-ok'){
           vm.scanvalid = false;
           vm.error = false;
           vm.loginok = true;
           vm.loginokmsg = 'You are logged in into '+infoFromServer.id;
           console.log("secretkey on server ok.", data, status);
         } else {
           vm.scanvalid = false;
           vm.error = true;
           console.log("invalid sign from server", data);
           vm.errormsg = 'Error: ' + data.status;
         }
      })
      .error(function(error){
         console.log("Error while sending secret message to the server.");
         vm.scanvalid = false;
         vm.error = true;
         vm.errormsg = 'Error: ' + error;
      });
    }
    $http.post( infoFromServer.api+'/public-key', {token: infoFromServer.token, publickey: publicKey })
      .success(function(data, status){
         if(data.status === 'public-key-ok'){
           console.log("public-key on server ok.", data, status);
           signMsgValidateIdentity(data.secretstr);
         } else {
           vm.scanvalid = false;
           vm.error = true;
           vm.errormsg = 'Error: ' + data;
         }
      })
      .error(function(error){
         console.log("Error while sending public-key to server.");
         vm.scanvalid = false;
         vm.error = true;
         vm.errormsg = 'Error: ' + error;
      });
  }
})
.controller('IdentityCtrl', function($scope, SelfCache) {
  var vm = this;
  vm.user = SelfCache.get('userdata');
  vm.saveinfolocal = function(){
    SelfCache.put('userdata',vm.user);
  }
})
.controller('KeysCtrl', function(KeyCache, $cordovaBarcodeScanner) {
  var vm = this;
  vm.keysready = false;
  vm.keys = KeyCache.get("userkeys");
  if(vm.keys === undefined || vm.keys === null){
    vm.ownkey = false;
  } else {
    vm.ownkey = true;
  }
  function emptyValues(){
    vm.scanResult = {
      public: {
        key:'',
        value:'',
      },
      private: {
        key:'',
        value:'',
      },
    }
  };
  emptyValues();

  vm.settings = {
    showprivkey: false
  };
  vm.scan = function(typescan){
    console.log("typescan",typescan);
    vm.typescan = typescan;
    $cordovaBarcodeScanner
      .scan()
      .then(function(result) {
          // Success! Barcode data is here
          //infoFromServer = JSON.parse(result);
          console.log("scan result",vm.typescan,result);
          vm.scanResult[vm.typescan].key =  result.text;
          vm.scanResult[vm.typescan].value = result.format;
          vm.scanvalid = true;
          vm.error = false;
          if(vm.scanResult['public'].key !== '' && vm.scanResult['private'].key !==''){
            vm.keysready = true;
          }
      }, function(error) {
          // An error occurred
          vm.scanvalid = false;
          vm.error = true;
          vm.errormsg = typescan + '-Error: ' + error;
          console.log("scan error", error, typescan);
      },
      {
          "showFlipCameraButton" : true, // iOS and Android
          "prompt" : "Place a barcode inside the scan area", // supported on Android only
          "formats" : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
          "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
      });
  };
  vm.saveKeys = function(){
    console.log("saveKeys",vm.scanResult);
    KeyCache.put("userkeys",vm.scanResult);
    vm.keysready = false;
    vm.ownkey = true;
    vm.keys = vm.scanResult;
  }
  vm.clearKeys = function(){
    KeyCache.clear("userkeys");
    emptyValues();
    vm.ownkey = false;
    vm.keysready = false;
  }
});
