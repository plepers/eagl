
define( function() {

  var RenderUnit = function( pass, geom, glConfig ){
    this.next = null;
    this.prev = null;

    this.mask = 0x1; // U24

    this.pass     = ( undefined !== pass )     ? pass     : null;
    this.geom     = ( undefined !== geom )     ? geom     : null;
    this.glConfig = ( undefined !== glConfig ) ? glConfig : null;

  };

  RenderUnit.prototype = {



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