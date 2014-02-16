
define( function(){



  function MaterialPass(){

    this.uniforms   = {};
    this.attributes = {};

    this.uniformsList   = [];
    this.attributesList = [];

    this.defines    = {};


  }

  MaterialPass.prototype = {

    getFragmentCode : function() {
      return "";
    },


    getVertexCode : function() {
      return "";
    }

  };

  return MaterialPass;

});