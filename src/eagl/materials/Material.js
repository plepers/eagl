
define(
  [ './MaterialPass' ],
  function( MaterialPass ){

  var Material = function() {

    this._passes  = [];
    this._passMap  = {};

    this._owners  = [];


  };

  Material.prototype = {

    /*
    type
      DEFAULT
      DEPTH
      NORMAL
    */
    getPass : function( output ){
      var outputId = output.id;
          pass = this._passMap[ outputId ];

      if( !pass ){
        pass = this._createPass( output );
        if( pass ){
          this._passes.push( pass );
          this._passMap[ outputId ] = pass;
        }
      }

      return pass;
    },

    getPasses : function(){
      return this._passes;
    },

    _createPass : function( output ){
      return new MaterialPass();
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