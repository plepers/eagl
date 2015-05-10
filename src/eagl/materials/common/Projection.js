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

    lang.extend( Projection, ShaderPart );

    var _instance = null;

    Projection.getInstance = function(){
      if( !_instance )
        _instance = new Projection();
      return _instance;
    };

    function Projection(){
      ShaderPart.call( this );

      this.v_uniforms.push( glsl.mat4( 'modelViewMatrix' ) );
      this.attributes.push( glsl.vec3( 'position' ) );
      this.v_mainCode = "gl_Position = vec4(position, 1.0)*modelViewMatrix;";
    }

    return Projection;

  }
);