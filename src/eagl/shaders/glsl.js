
define( function(){

  const vec2_type  = 'vec2',
        vec3_type  = 'vec3',
        vec4_type  = 'vec4',

        bvec2_type = 'bvec2',
        bvec3_type = 'bvec3',
        bvec4_type = 'bvec4',

        ivec2_type = 'ivec2',
        ivec3_type = 'ivec3',
        ivec4_type = 'ivec4',

        bool_type  = 'bool',
        int_type   = 'int',
        float_type = 'float',

        mat2_type  = 'mat2',
        mat3_type  = 'mat3',
        mat4_type  = 'mat4',

        sampler2D_type    = 'sampler2D',
        samplerCube_type  = 'samplerCube';

  var glsl = {};

  function GLSLValue( type, name ){
    this.type = type;
    this.name = name;
    this.str = type +' '+ name+';';
  }


  glsl.vec2  = function( name ){ return new GLSLValue( vec2_type, name ); };
  glsl.vec3  = function( name ){ return new GLSLValue( vec3_type, name ); };
  glsl.vec4  = function( name ){ return new GLSLValue( vec4_type, name ); };

  glsl.mat2  = function( name ){ return new GLSLValue( mat2_type, name ); };
  glsl.mat3  = function( name ){ return new GLSLValue( mat3_type, name ); };
  glsl.mat4  = function( name ){ return new GLSLValue( mat4_type, name ); };

  glsl.ivec2 = function( name ){ return new GLSLValue( ivec2_type, name ); };
  glsl.ivec3 = function( name ){ return new GLSLValue( ivec3_type, name ); };
  glsl.ivec4 = function( name ){ return new GLSLValue( ivec4_type, name ); };

  glsl.bvec2 = function( name ){ return new GLSLValue( bvec2_type, name ); };
  glsl.bvec3 = function( name ){ return new GLSLValue( bvec3_type, name ); };
  glsl.bvec4 = function( name ){ return new GLSLValue( bvec4_type, name ); };

  glsl.bool  = function( name ){ return new GLSLValue( bool_type , name ); };
  glsl.int   = function( name ){ return new GLSLValue( int_type  , name ); };
  glsl.float = function( name ){ return new GLSLValue( float_type, name ); };


  glsl.sampler2D   = function( name ){ return new GLSLValue( sampler2D_type  , name ); };
  glsl.samplerCube = function( name ){ return new GLSLValue( samplerCube_type, name ); };

  return glsl;
});