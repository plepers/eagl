define(
[
  '../Geometry'
],function(
  Geometry
){

  function planeGeometry( width, height, segW, segH )
  {


    var width_half = width / 2;
    var height_half = height / 2;

    var gridX = segW || 1;
    var gridY = segH || 1;
    var gridX1 = gridX + 1;
    var gridY1 = gridY + 1;

    var segment_width = width / gridX;
    var segment_height = height / gridY;

    var nverts = gridX1 * gridY1;



    var geom = new Geometry();
    var buffer = geom.createBuffer();

    buffer.addAttribute( 'position', 3 );
    buffer.addAttribute( 'normal', 3 );
    buffer.addAttribute( 'uv', 2 );

    buffer.allocate();



    var data = buffer.data;
    var offset = 0;

    var iy, ix;

    for ( iy = 0; iy < gridY1; iy ++ ) {

      var y = iy * segment_height - height_half;

      for ( ix = 0; ix < gridX1; ix ++ ) {

        var x = ix * segment_width - width_half;

        // position
        data[ offset     ] = x;
        data[ offset + 1 ] = - y;

        // normal
        data[ offset + 5 ] = 1;

        // uv
        data[ offset + 6 ] = ix / gridX;
        data[ offset + 7 ] = 1 - ( iy / gridY );

        offset += 8;

      }

    }

    var indices = geom.indexBuffer;

    indices.allocate( gridX * gridY * 6 );

    data = indices.data;

    for ( iy = 0; iy < gridY; iy ++ ) {

      for ( ix = 0; ix < gridX; ix ++ ) {

        var a = ix + gridX1 * iy;
        var b = ix + gridX1 * ( iy + 1 );
        var c = ( ix + 1 ) + gridX1 * ( iy + 1 );
        var d = ( ix + 1 ) + gridX1 * iy;

        data[ offset     ] = a;
        data[ offset + 1 ] = b;
        data[ offset + 2 ] = d;

        data[ offset + 3 ] = b;
        data[ offset + 4 ] = c;
        data[ offset + 5 ] = d;

        offset += 6;

      }

    }

    return geom;

  }

  return planeGeometry;

});

