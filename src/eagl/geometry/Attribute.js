define( function(){


  function Attribute( name, size, buffer ){
    this.name = name;
    this.size = size;
    this.buffer = buffer;
    this.pointer = 0;
  }


  Attribute.prototype = {

    prepare : function( gl, attrLocation )
    {
      var buffer = this.buffer;
      buffer.bind();
      gl.enableVertexAttribArray( attrLocation );
      gl.vertexAttribPointer( attrLocation, this.size, _gl.FLOAT, false, buffer.stride, this.pointer );
    }

  };

  return Attribute;
});