
define(
  [
    'eagl/core/Pipeline',
    'eagl/core/Viewport',
    'eagl/lang',
    './Object3D'
  ],
  function(
    Pipeline,
    Viewport,
    lang,
    Object3D
  ){

  lang.extend( Scene, Object3D );

  function Scene(){

    Object3D.call( this );

    // internal
    this.pipeline = new Pipeline();

    // main rendering viewport
    this.viewport = new Viewport();

    // as root Object3D
    this.scene = this;

  }

  var proto = Scene.prototype;


  return Scene;

});