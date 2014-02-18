
define(
  [
    './RenderUnit',
  ],
  function(
    RenderUnit
  ){

  _nullUnit = function(){
    var unit = new RenderUnit();
    unit._mask = 0;
    return unit;
  };


  function Thread( prio ) {

    var _rhead = _nullUnit(),
        _rtail = _nullUnit();

    _rhead.next = _rtail;
    _rtail.prev = _rhead;


    this._priority   = prio;
    this._rhead      = _rhead;
    this._rtail      = _rtail;
    this.head        = _rhead;
    this.tail        = _rhead;
  }

  Thread.prototype = {
    append : function( unit ) {
      unit.add( this.tail );
    },

    prepend : function( unit ) {
      unit.add( this._rhead );
    }
  };



  function Pipeline(){

    this._threads = [];

  }

  Pipeline.prototype = {



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

    getThread : function( prio ){
      var i = 0,
          match = 0,
          priority,
          thread, nthread,
          _threads = this._threads,
          l = _threads.length;

      for (; i < l; i++) {
        thread = _threads[i];
        priority = thread._priority;

        if( priority < prio ) {
          match = i+1;
        }
        else if( priority === prio ){
          return thread;
        }
        else break;
      }

      nthread = new Thread( prio );
      _threads.splice( match, 0, nthread );
      if( match > 0 ) {
        thread = _threads[match-1];
        thread._rtail.next = nthread._rhead;
        nthread._rhead.prev = thread._rtail;
      }
      if( match < l ){
        thread = _threads[match+1];
        thread._rhead.prev = nthread._rtail;
        nthread._rtail.next = thread._rhead;
      }

      return nthread;
    }



  };

  return Pipeline;

});