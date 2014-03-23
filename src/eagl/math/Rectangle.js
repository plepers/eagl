define( function(){

  function Rectangle(){
    this.x      = 0.0;
    this.y      = 0.0;
    this.width  = 0.0;
    this.height = 0.0;
  }

  Rectangle.prototype = {

    set : function( x, y, width, height ){
      this.x      = x;
      this.y      = y;
      this.width  = width;
      this.height = height;
    },

    isEmpty : function(){
      return ( this.width === 0.0 || this.y === 0.0 );
    }

    // union
    // intersection
    // etc


  };

  return Rectangle;
});