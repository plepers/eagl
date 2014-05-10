

define( function(){

  function ShaderPart(){
    this.v_uniforms   = [];
    this.f_uniforms   = [];
    this.varyings     = [];
    this.attributes   = [];
    this.v_defines    = [];
    this.f_defines    = [];

    this.v_preCode    = null;
    this.v_mainCode   = null;
    this.f_preCode    = null;
    this.f_mainCode   = null;
  }

  ShaderPart.prototype = {



  };

  return ShaderPart;

});