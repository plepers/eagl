define( function(){

  var FArray = Float32Array;


  function GeomBuffer( size, type, ncomps ){

    this.type = type;

    this.array = new FArray( size*ncomps );

  }


});