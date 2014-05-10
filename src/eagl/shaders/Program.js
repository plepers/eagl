
define(
  [

  ],
  function(

  ){

  var _NL  = "\n",
      _TAB = "\t";

  function _wrap( code ){
    return "void main(void) {"+_NL+code+_NL+"}";
  }
  function _capitalize( name ){
    return name.charAt(0).toUpperCase() + name.slice(1);
  }


  function Declarations( type ){
    this.type = type;
    this.list = [];
    this.map = {};
  }

  Declarations.prototype = {


    append: function( values ){
      var val;
      for (var i = 0, l = values.length; i < l; i++) {
        val = values[i];
        if( !this.map[val.name] ){
          this.list.push( val );
          this.map[val.name] = val;
        }
      }
    },

    getCode: function( ){
      var prefix = this.type + " ",
          code = "";

      for (var i = 0, l = this.list.length; i < l; i++) {
        code += prefix + this.list[i].toString() + _NL;
      }
      return code;
    },

    getAttributeCode: function( ){
      var prefix = this.type + " ",
          code = "",
          attr;

      for (var i = 0, l = this.list.length; i < l; i++) {
        attr = this.list[i];
        code += prefix + attr.type + " a" + _capitalize(attr.name) + ";" + _NL;
      }
      return code;
    }


  };


  function Program(){

    this.vertUniforms   = new Declarations( "uniform" );
    this.fragUniforms   = new Declarations( "uniform" );

    this.varyings       = new Declarations( "varying" );
    this.attributes     = new Declarations( "attribute" );

    this.vertDefines    = [];
    this.fragDefines    = [];

    this.chunks     = [];
  }

  Program.prototype = {


    addChunk: function( chunk ){
      this.chunks.push( chunk );

      this.vertUniforms.append(   chunk.v_uniforms );
      this.fragUniforms.append(   chunk.f_uniforms );

      this.varyings.append(       chunk.varyings );
      this.attributes.append(     chunk.attributes );

      this.vertDefines.push(      chunk.v_defines );
      this.fragDefines.push(      chunk.f_defines );

    },

    getCode : function( holder ) {
      var vPreCode = "",
          fPreCode = "",
          vCode = "",
          fCode = "",
          chunks = this.chunks,
          chunk;


      vPreCode += this.vertDefines.join( _NL );
      vPreCode += this.attributes.getAttributeCode();
      vPreCode += this.vertUniforms.getCode();
      vPreCode += this.varyings.getCode();

      fPreCode += this.fragDefines.join( _NL );
      fPreCode += this.fragUniforms.getCode();
      fPreCode += this.varyings.getCode();

      vCode += this.getAttributesExposure();

      for (var i = 0, l = chunks.length; i < l; i++) {
        chunk = chunks[i];
        if( chunk.v_preCode )
          vPreCode += chunk.v_preCode + _NL;
        if( chunk.f_preCode )
          fPreCode += chunk.f_preCode + _NL;
        if( chunk.v_mainCode )
          vCode    += _TAB + chunk.v_mainCode + _NL;
        if( chunk.f_mainCode )
          fCode    += _TAB + chunk.f_mainCode + _NL;
      };

      holder.v = vPreCode + _wrap( vCode );
      holder.f = fPreCode + _wrap( fCode );

    },

    getAttributesExposure: function(){
      var attribs = this.attributes.list,
          code = "",
          a;

      for (var i = 0, l = attribs.length; i < l; i++) {
        a = attribs[i];
        code += _TAB + a.type+" "+a.name + " = " + "a"+_capitalize(a.name)+";"+_NL;
      }
      return code;
    }

  };


  return Program;

});