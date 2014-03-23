
define( function() {

  var RenderUnit = function( pass, geom, glConfig ){
    this.next = null;
    this.prev = null;

    this._mask = 0xFFFFFF; // U24

    this.pass     = ( undefined !== pass )     ? pass     : null;
    this.geom     = ( undefined !== geom )     ? geom     : null;
    this.glConfig = ( undefined !== glConfig ) ? glConfig : null;

    this._pipeline = null;
  };

  RenderUnit.prototype = {



    set mask( val ){
      if( this._mask !== val ) {
        this._mask = val;
        if( null !== this._pipeline ) {
          this._pipeline.updateUnit( this );
        }
      }
    },



    get mask(){
      return this._mask;
    },



    // set thread( val ){
    //   if( this._thread !== val ) {
    //     this._thread = val;
    //     if( null !== this._pipeline ) {
    //       this._pipeline.updateUnit( this );
    //     }
    //   }
    // },



    // get thread(){
    //   return this._thread;
    // },



    pipe : function( pipeline ){
      var curr = this._pipeline;
      if( curr !== pipeline ) {
        if( null !== curr ) {
          curr.removeUnit( this );
        }
        this._pipeline = pipeline;
      }
    },

    unpipe : function( pipeline ){
      var curr = this._pipeline;
      if( pipeline === curr ) {
        this._pipeline = null;
      }
    },

    remove : function( ){
      var next = this.next;
      this.prev.next = next;
      next.prev = this.prev;
      this.next = null;
      this.prev = null;
    },

    add : function(item){
      // todo test if already added
      var next = item.next;
      this.next = next;
      this.prev = item;
      next.prev = this;
      item.next = this;
    }




  };

  return RenderUnit;

});