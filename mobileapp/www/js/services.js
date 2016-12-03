angular.module('self.services', [])
.factory('KeyCache', function(CacheFactory) {
  CacheFactory("userkeys", { storageMode: "localStorage"});
  self.userkeys = CacheFactory.get("userkeys");

  return {
    put: function(key, value) {
      return self.userkeys.put(key, value);
    },
    get: function(key) {
      return self.userkeys.get(key)
    },
    clear: function(key) {
      return self.userkeys.remove(key);
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
    clear: function(key) {
      return self.userdata.remove(key);
    }
  };
})
