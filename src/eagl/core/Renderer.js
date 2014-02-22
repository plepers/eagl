
define( [
    'eagl/gl/GLConfig'
  ], function(
    GLConfig
  ){

  var Renderer = function(){

    this.glContext = null;

  };

  Renderer.prototype = {

    renderPipeline : function( pipeline ){

      unit = pipeline.getHead();

      do {
        this.processUnit( unit );
      } while( null !== (unit = unit.next) );

    },


    processUnit : function( unit ){

      var glConfig  = unit.glConfig,
          pass      = unit.pass,
          geom      = unit.geom;

      if( null !== glConfig ) {
        glContext.pushConfig( glConfig );
      }



    }

  };

  return Renderer;

});