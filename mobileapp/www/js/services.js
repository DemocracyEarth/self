angular.module('self.services', [])
.factory('KeyCache', function(CacheFactory) {
  CacheFactory("userkeys", { storageMode: "localStorage"});
  self.userdata = CacheFactory.get("userkeys");

  return {
    put: function(key, value) {
      return self.userdata.put(key, value);
    },
    get: function(key) {
      return self.userdata.get(key)
    },
    getKey: function(chatId) {
      return null;
    }
  };
})
.factory('SelfCache', function(CacheFactory) {
  CacheFactory("userdata", { storageMode: "localStorage"});
  self.userdata = CacheFactory.get("userdata");

  return {
    put: function(key, value) {
      return self.userdata.put(key, value);
    },
    get: function(key) {
      return self.userdata.get(key)
    },
    getKey: function(chatId) {
      return null;
    }
  };
})
