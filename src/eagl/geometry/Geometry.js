define( function(){


  function Geometry(){
    this.attribs = [];
    this.map = {};
  }

  Geometry.prototype = {

    addAttribute : function( name, buffer ){
      if( this.map[ name ] ){
        return;
      }

      this.attribs.push( buffer );
      this.map[ name ] = buffer;

    },

    getAttribute : function( name ){
      return this.map[ name ] || null;
    }

  };

});