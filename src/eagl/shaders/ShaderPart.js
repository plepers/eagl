

define( function(){

  function ShaderPart(){
    this.uniforms   = [];
    this.varyings   = [];
    this.attributes = [];
    this.defines    = [];

    this.preCode    = null;
    this.mainCode   = null;
  }

  ShaderPart.prototype = {



  };

  return ShaderPart;

});