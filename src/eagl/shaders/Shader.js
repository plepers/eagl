
define( function(){


  function ValuesList( type ){
    this.type = type;
    this.list = [];
    this.map = {};
  }

  ValuesList.prototype = {


    append : function( values ){
      var val;
      for (var i = 0, l = values.length; i < l; i++) {
        val = values[i];
        if( !this.map[val.name] ){
          this.list.push( val );
          this.map[val.name] = val;
        }
      }
    }


  };



  function Shader( type ){
    this.type = type;

    this.uniforms   = new ValuesList( "uniform" );
    this.varyings   = new ValuesList( "varying" );
    this.attributes = new ValuesList( "attribute" );
    this.defines    = [];

    this.chunks     = [];

  }

  Shader.prototype = {

    addChunk : function( chunk ){
      this.chunks.push( chunk );

      this.uniforms.append(   chunk.uniforms );
      this.varyings.append(   chunk.varyings );
      this.attributes.append( chunk.attributes );
    },

    getCode : function() {

    }



  };

  return Shader;

});