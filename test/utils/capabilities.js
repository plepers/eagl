define( function(){

  var _haveGL = (function(){
    if( document != undefined ){
      var canvas = document.createElement( 'canvas' );
      if( canvas != undefined ){
        var p = {stencil: true};
        var gl = canvas.getContext( 'webgl',p ) || canvas.getContext( 'experimental-webgl',p );
        if( gl != null )
          return true;
      }
    }
    return false;
  })();

  var webgl = function(){
    return _haveGL;
  }

  return {
    webgl : webgl
  };
});