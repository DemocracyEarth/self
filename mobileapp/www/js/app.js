angular.module('self', ['ionic', 'self.services','self.controllers','ngCordova','angular-cache'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  // Each tab has its own nav history stack:
  .state('tab.scanner', {
    url: '/scanner',
    views: {
      'tab-scanner': {
        templateUrl: 'templates/tab-scanner.html',
        controller: 'ScannerCtrl as vm'
      }
    }
  })
  .state('tab.identity', {
    url: '/identity',
    views: {
      'tab-identity': {
        templateUrl: 'templates/tab-identity.html',
        controller: 'IdentityCtrl as vm'
      }
    }
  })
  .state('tab.keys', {
    url: '/keys',
    views: {
      'tab-keys': {
        templateUrl: 'templates/tab-keys.html',
        controller: 'KeysCtrl as vm'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/scanner');

});
