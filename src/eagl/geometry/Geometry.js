define( [
  './GeomBuffer'
],
function(
  GeomBuffer
){


  function Geometry( numVertices ){
    this.buffers = [];
    this.attribs = [];
    this.map = {};

    var wide = numVertices > 0xFFFF;
    this.indexBuffer = new GeomBuffer.IndexBuffer( this, wide );

    this.numVertices = numVertices;
  }

  Geometry.prototype = {

    createBuffer : function()
    {
      var buffer = new GeomBuffer.VertexBuffer( this );
      this.buffers.push( buffer );
      return buffer;
    },

    _addAttribute : function( attribute )
    {

      var name = attribute.name;

      if( this.map[ name ] ){
        throw new Error( "Geometry.addAttribute : attribute already exist" );
      }

      this.attribs.push( attribute );
      this.map[ name ] = attribute;

    },

    getAttribute : function( name ){
      return this.map[ name ] || null;
    }

  };

  return Geometry;

});