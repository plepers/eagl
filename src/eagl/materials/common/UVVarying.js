define(
  [
    'eagl/lang',
    'eagl/shaders/ShaderPart',
    'eagl/shaders/glsl'
  ],
  function(
    lang,
    ShaderPart,
    glsl
  ){

    lang.extend( UVVarying, ShaderPart );

    var _instances = [];

    UVVarying.getInstance = function( channel ){
      if( channel > 16 ) return null; // todo throw

      if( !_instances[channel] )
        _instances[channel] = new UVVarying( channel );
      return _instances[channel];
    };

    function UVVarying( channel ){
      ShaderPart.call( this );

      this.varyings.push( glsl.vec2( 'vUv'+channel ) );
      this.attributes.push( glsl.vec2( 'uv'+channel ) );
      this.v_mainCode = "vUv" + channel +" = uv"+channel+";";
    }

    return UVVarying;

  }
);