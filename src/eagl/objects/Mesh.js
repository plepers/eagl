


define(
  [
    'eagl/lang',
    'eagl/core/Renderable',
    './Object3D'
  ],
  function(
    lang,
    Renderable,
    Object3D
  ){

  lang.extend( Mesh, Object3D );

  function Mesh( geometry, material ){

    Object3D.call( this );

    this._renderable = new Renderable();
    this._material = null;
    this._geometry = null;

    if( undefined !== geometry ) this.geometry = geometry;
    if( undefined !== material ) this.material = material;

  }

  var proto = Mesh.prototype;


  //
  // material getter/setter
  //
  lang.getset( proto, 'material',
    function(){
      return this._material;
    },
    function( mat ){
      if( this._material !== mat ) {
        this._material = mat;
        this._renderable.setMaterial( mat );
      }
    }
  );

  //
  // geometry getter/setter
  //
  lang.getset( proto, 'geometry',
    function(){
      return this._geometry;
    },
    function( geom ){
      if( this._geometry !== geom ) {
        this._geometry = geom;
        this._renderable.setGeometry( geom );
      }
    }
  );



  proto.getRenderable = function(){
    return this._renderable;
  };

  return Mesh;

});