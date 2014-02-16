
define(
  [
    'eagl/core/Pipeline',
    'eagl/lang',
    './Object3D'
  ],
  function(
    Pipeline,
    lang,
    Object3D
  ){

  lang.extend( Scene, Object3D );

  function Scene(){

    Object3D.call( this );

    this.pipeline = new Pipeline();

    this.scene = this;

  }

  var proto = Scene.prototype;


  return Scene;

});