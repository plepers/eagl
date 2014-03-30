
define(
  [
    './Batch'
  ],
  function(
    Batch
  ){



  Technic.COLOR   = 1;
  Technic.DEPTH   = 2;
  Technic.NORMAL  = 4;

  function Technic( id ){

    this.id = id;

    this._batches   = [];

  }

  Technic.prototype = {




    addUnit : function( unit ){
      var batches = this._batches,
          batch;
      for (var i = 0, l = batches.length; i < l; i++) {
        batch = batches[i];
        if( batch.mask & unit.mask !== 0 )
          batch.append( unit );
      };
    },



    addBatch : function( index, mask ){
      var b = new Batch( mask );
      this._batches.splice( index, 0, b );
      return b;
    }


  };


  return Technic;

})