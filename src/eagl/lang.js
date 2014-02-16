

define( function(){

  var __hasProp = {}.hasOwnProperty;
  var __defProp = Object.defineProperty;

  var __extend = function( child, parent ) {
    for (var key in parent) {
      if (__hasProp.call(parent, key)) child[key] = parent[key];
    }

    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
  };

  var __getset = function( obj, prop, _get, _set ){
    __defProp( obj, prop, {
      get : _get,
      set : _set,
    });
  };

  return {
    extend : __extend,
    getset : __getset
  };
});