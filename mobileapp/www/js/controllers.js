angular.module('self.controllers', [])
.controller('ScannerCtrl', function($scope,$http, $rootScope, $cordovaBarcodeScanner, SelfCache) {
  var infoFromServer;
  var vm = this;
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
    var userinfo = {
      user: user,
      key: 'userk-public-key',
      otras: 'entrepreneur'
    };
    $http.post( infoFromServer.api, {token: infoFromServer.token, userinfo:userinfo })
    .success(function(data, status){
       if(data.login == 'ok'){
         vm.scanvalid = false;
         vm.error = false;
         vm.loginok = true;
         vm.loginokmsg = 'You are logged in into '+infoFromServer.id;
         console.log("Login on the server Ok.", data, status);
       } else {
         console.log("Login on the server Ok.", data, status);
         vm.scanvalid = false;
         vm.error = true;
         vm.errormsg = 'Error: ' + data;
       }
    }).error(function(error){
       console.log("Error while Login on server.");
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
.controller('KeysCtrl', function($scope, Key) {
  $scope.settings = {
    enableKeys: false
  };
});
