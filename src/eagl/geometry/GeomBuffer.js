define( [
    'eagl/gl/GLEnum',
    './Attribute'
  ],
  function(
    GLEnum,
    Attribute
  ){

  var FArray = Float32Array;


  function VertexBuffer( geom ){
    this.geom = geom;

    this.stride     = 0;
    this.attributes = [];
    this.attributesMap = {};
    this.data       = null;
    this.glBuffer   = null;

    this.usage = GLEnum.STATIC_DRAW;
  }



  VertexBuffer.prototype = {

    addAttribute : function( name, size )
    {
      var attr = new Attribute( name, size, this );

      if( this.attributesMap[ name ] ){
        throw new Error( "VertexBuffer.addAttribute : attribute "+name+" already exist" );
      }
      this.attributesMap[ name ] = attr;
      this.attributes.push( attr );

      attr.pointer = this.stride;
      this.stride += size;

      this.geom._addAttribute( attr );

      this.invalidate();
    },

    enable : function( gl, attrName, attrLocation )
    {
      var attr = this.attributesMap[ attrName ];

      this.bind();
      gl.enableVertexAttribArray( attrLocation );
      gl.vertexAttribPointer( attrLocation, attr.size, GLEnum.FLOAT, false, this.stride * 4, attr.pointer * 4 );
    },

    allocate : function()
    {
      this.data = new FArray( this.geom.numVertices * this.stride );
    },

    bind : function( gl )
    {
      if( null === this.glBuffer ){
        this.glBuffer = gl.createBuffer();
      }
      gl.bindBuffer( GLEnum.ARRAY_BUFFER, this.glBuffer );
    },

    upload : function( gl )
    {
      gl.bufferData( GLEnum.ARRAY_BUFFER, this.data, this.usage );
    },

    invalidate : function( )
    {

    }

  };


  function IndexBuffer( geom, wide ){
    this.geom = geom;
    this.wide = !!wide;

    this.data       = null;
    this.glBuffer   = null;

    this.usage = GLEnum.STATIC_DRAW;
  }

  IndexBuffer.prototype = {


    allocate : function( numTris )
    {
      var Array = this.wide ? Uint32Array : Uint16Array;
      this.data = new Array( numTris * 3 );
    },

    bind : function( gl )
    {
      if( null === this.glBuffer ){
        this.glBuffer = gl.createBuffer();
      }
      gl.bindBuffer( GLEnum.ELEMENT_ARRAY_BUFFER, this.glBuffer );
    },

    upload : function( gl )
    {
      gl.bufferData( GLEnum.ELEMENT_ARRAY_BUFFER, this.data, this.usage );
    },

    invalidate : function( )
    {

    }
  };

  return {
    VertexBuffer : VertexBuffer,
    IndexBuffer : IndexBuffer
  };

});