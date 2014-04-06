

define(
  [
    './RenderUnit',
  ],
  function(
    RenderUnit
  ){




  function _nullUnit(){
    var unit = new RenderUnit();
    unit._mask = 0;
    return unit;
  }


  function Batch( mask ) {

    var _rhead = _nullUnit(),
        _rtail = _nullUnit();

    _rhead.next = _rtail;
    _rtail.prev = _rhead;


    this.mask        = mask;
    this._rhead      = _rhead;
    this._rtail      = _rtail;
    this.head        = _rhead;
    this.tail        = _rhead;

    this._mask       = 1;
  }

  Batch.prototype = {

    append : function( unit ) {
      unit.add( this.tail );
      this.tail = unit;
    },

    prepend : function( unit ) {
      unit.add( this._rhead );
    }

  };

  return Batch;


});
