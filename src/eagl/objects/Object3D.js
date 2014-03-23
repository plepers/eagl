
define( ['eagl/math/mat4'], function( mat4 ) {

  var Object3D = function() {

    // Privates - getset?
    this.matrix       = mat4.create();
    this.matrixWorld  = mat4.create();
    this.invalidMw    = true;

    this.mask         = 0x7FFFFFFF;

    this.name         = null;
    this.parent       = null;
    this.children     = [];

    this.renderables  = null;
    this.scene        = null;

  };


  Object3D.prototype = {



    invalidateMatrixWorld : function() {
      this.invalidMw = true;
    },



    add : function( child ) {
      var p = child.parent;

      if( p !== this ){

        if( null !== p )
          p.remove( child );

        child.parent = this;
        this.children.push( child );

        if( null !== this.scene )
          child.setScene( this.scene );
      }
    },



    remove : function( child ) {

      if( child.parent === this ) {
        child.parent = null;
        var index = this.children.indexOf( child );
        this.children.splice( index, 1 );

        if( null !== this.scene )
          child.setScene( null );
      }

    },



    traverse : function( traverser ) {
      var i, c, l;

      if( traverser.enter( this ) ) {

        c = this.children;
        l = c.length;

        for ( i=0; i < l; i++ ) {
          c.traverse( traverser );
        }

      }

      traverser.leave( this );

    },

    setScene : function( scene ){
      var i, c, l,
          pipe,
          renderable;

      if( this.scene !== scene ) {

        renderable = this.getRenderable();


        if( null !== renderable ){
          if( null !== this.scene )
            this.scene.pipeline.removeRenderable( renderable );
          if( null !== scene )
            scene.pipeline.addRenderable( renderable );
        }

        this.scene = scene;

        c = this.children;
        l = c.length;

        for ( i=0; i < l; i++ ) {
          c[i].setScene( scene );
        }
      }
    },

    getRenderable : function(){
      return null; // abstract
    }


  };

  return Object3D;

});