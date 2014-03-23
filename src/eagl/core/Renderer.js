
define( [
    'eagl/gl/GLConfig'
  ], function(
    GLConfig
  ){

  var Renderer = function(){

    this.glContext = null;

    // the viewport currently rendered
    this.viewport = null;

  };

  Renderer.prototype = {

    renderScene : function( scene ){

      renderPipeline( scene.pipeline );
    },

    renderPipeline : function( pipeline ){

      // run pipeline's threads against all viewports

      unit = pipeline.getHead();

      do {
        this.processUnit( unit );
      } while( null !== (unit = unit.next) );

    },


    renderViewport : function( vp ) {
      if( null !== this.currentViewport )
        this.viewport.deactivate();

      vp.activate();
      this.viewport = vp;

    },


    processUnit : function( unit ){

      var glConfig  = unit.glConfig,
          pass      = unit.pass,
          geom      = unit.geom,
          hasCfg    = ( null !== glConfig );

      if( hasCfg ) {
        glContext.pushConfig( glConfig );
        glContext.applyConfig();
      }





      if( hasCfg ) {
        glContext.popConfig();
      }



    }

  };

  return Renderer;

});