
define(
  [
    './Batch'
  ],
  function(
    Batch
  ){



  function Output( id ){

    this.id = id;

    this._batches   = [];

  }

  Output.prototype = {




    addUnit : function( unit ){
      var batches = this._batches,
          batch;
      for (var i = 0, l = batches.length; i < l; i++) {
        batch = batches[i];
        if( batch.mask & unit.mask !== 0 )
          batch.append( unit );
      }
    },



    addBatch : function( index, mask ){
      var b = new Batch( mask );
      this._batches.splice( index, 0, b );
      return b;
    }


  };


  return Output;

});