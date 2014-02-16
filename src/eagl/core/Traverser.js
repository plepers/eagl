

define( [
    'eagl/math/mat4',
    'eagl/objects/Object3D'
  ],
  function(
    mat4,
    Object3D
  ) {

  var Traverser = function() {

    this.matStack     = [ mat4.create() ];
    this.stackIndex   = 0;
    this.mwInvalidAt  = 0;
    this.invalidStack = false;

    this.heads        = {};

  };

  Traverser.prototype = {



    pushRenderables : function( renderables ){
      var i = 0,
          l = renderables.length;

      for( i=0; i<l; i++ ) {

      }

    },



    enter : function( node ){

      // update matrixWorld

      if( this.invalidStack || node.invalidMw ) {

        this.invalidStack = true;

        if( this.mwInvalidAt === 0 )
          this.mwInvalidAt = this.stackIndex;

        mat4.mul(
          this.matStack[this.stackIndex],
          node.matrix,
          node.matrixWorld
        );

        node.invalidMw = false;
      }


      this.stackIndex++;

      this.matStack[this.stackIndex] = node.matrixWorld;

      // collect renderables
      renderables = node.renderables;
      if( renderables !== null )
        this.pushRenderables( renderables );


      return true;
    },



    leave : function( node ){
      this.stackIndex--;

      if( this.mwInvalidAt === this.stackIndex ) {
        this.invalidStack = false;
        this.mwInvalidAt = 0;
      }

    }

  };

  return Traverser;

});