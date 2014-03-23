
define(
  [ './MaterialPass' ],
  function( MaterialPass ){

  var Material = function() {

    this._passes  = [];
    this._owners  = [];

    // test
    this._passes.push( new MaterialPass() );
    this._passes.push( new MaterialPass() );

  };

  Material.prototype = {

    /*
    type
      DEFAULT
      DEPTH
      NORMAL
    */
    getTechnic : function( type, opts ){

    },

    getPasses : function(){
      return this._passes;
    },

    addPass : function( pass ) {
      var p = this._passes;
      if( o.indexOf( pass ) === -1 ) {
        p.push( pass );
      }
    },

    removePass : function( pass ) {
      var p = this._passes,
          idx = p.indexOf( pass );
      if( idx > -1 ) {
        p.splice( idx, 1 );
      }
    },

    addOwner : function(renderable){
      var o = this._owners;
      if( o.indexOf( renderable ) === -1 ) {
        o.push( renderable );
      }
    },

    removeOwner : function(renderable){
      var o = this._owners,
          idx = o.indexOf( renderable );
      if( idx > -1 ) {
        o.splice( idx, 1 );
      }
    },

    notifyOwners : function(){
      var owners = this._owners;

      for (var i = 0, l = owners.length; i < l; i++) {
        owners[i].invalidatePasses();
      }
    }



  };

  return Material;

});