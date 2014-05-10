
define( function(){

  function Viewport( camera ){

    // the texture target, or null to render to backbuffer
    this._target = null;
    // the surface id (for cube taregts)
    this._surface = 0;

    // binary mask to filter threads and units
    this._mask = 1;

    // ratio option to scale the vertices projection
    this.ratio = [ 1.0, 1.0 ];

    // the camera to use to render this viewport
    this.camera = camera;

    // if not null enable glScissor to viewport
    // type Rectangle
    this.scissor = null;

    // ouput providing batch to render in this viewport
    this.output = null;

  }

  Viewport.prototype = {

    setTarget : function( renderTarget ){

      this._target = renderTarget;

      if( null === renderTarget ){
        // render to backbuffer
      } else {
        // render to texture
      }

    },

    setSurface : function( surface ){
      // for cube textures targets
      this._surface = surface;

    },

    activate : function(){
      // prepare to draw in
    },


    deactivate : function(){
      // release after drawn in
    }


  };

  return Viewport;

});