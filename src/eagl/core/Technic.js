
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

    this._batchs   = [];

  }

  Technic.prototype = {




    addUnit : function( unit ){

      unit.pipe( this );
      var thread = this.getThread( unit._thread );
      thread.append( unit );
    },

    removeUnit : function( unit ){
      unit.unpipe( this );
      unit.remove();
    },

    addUnits : function( units ){
      for (var i = 0, l = units.length; i < l; i++) {
        this.addUnit( units[i] );
      }
    },

    removeUnits : function( units ){
      for (var i = 0, l = units.length; i < l; i++) {
        this.removeUnit( units[i] );
      }
    },


    updateUnit : function( unit ){

    },




    addBatch : function( index, mask ){
      var b = new Batch( mask );
      this._batchs.splice( index, 0, b );
      return b;
    },

    getBatch : function( prio ){
      var i = 0,
          match = 0,
          priority,
          batch, nbatch,
          _batchs = this._batchs,
          l = _batchs.length;

      for (; i < l; i++) {
        batch = _batchs[i];
        priority = batch._priority;

        if( priority < prio ) {
          match = i+1;
        }
        else if( priority === prio ){
          return batch;
        }
        else break;
      }

      nbatch = new Batch( prio );
      _batchs.splice( match, 0, nbatch );
      if( match > 0 ) {
        batch = _batchs[match-1];
        batch._rtail.next = nbatch._rhead;
        nbatch._rhead.prev = batch._rtail;
      }
      if( match < l ){
        batch = _batchs[match+1];
        batch._rhead.prev = nbatch._rtail;
        nbatch._rtail.next = batch._rhead;
      }

      return nbatch;
    }

  };


  return Technic;

})