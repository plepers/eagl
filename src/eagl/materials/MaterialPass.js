
define(
  [
    'eagl/shaders/Program',
    './common/Projection',
    './common/UVVarying'
  ],
  function(
    Program,
    Projection,
    UVVarying
  ){



  function MaterialPass(){

    this.program    = new Program();
    this.program.addChunk( Projection.getInstance() );
    this.program.addChunk( UVVarying.getInstance(0) );

    var h = {};
    this.program.getCode( h );

  }

  MaterialPass.prototype = {

    addTechnic: function( shaderPart )
    {
      this.program.addChunk( shaderPart );
    },

    getProgram: function( gl ) {
      return null;
    }

  };

  return MaterialPass;

});