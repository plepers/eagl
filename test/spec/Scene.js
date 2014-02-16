
var expect  = require('expect.js');
var lreq    = require( "./lrequire" );
var aequal  = require( './aequal' );

var Object3D  = lreq( 'eagl/objects/Object3D' );
var Mesh      = lreq( 'eagl/objects/Mesh' );
var Scene     = lreq( 'eagl/objects/Scene' );
var Material  = lreq( 'eagl/materials/Material' );


var createGraph = function( name, depth, numChild, arr ){

  var o = new Object3D()
  o.name = name;
  if( arr !== undefined ) arr.push( o );

  if( depth > 0 ) {
    for (var i = 0; i < numChild; i++) {
      o.add( createGraph( name+'_'+i, depth-1, numChild, arr ) );
    }
  }
  return o;
}


describe( "objects - Scene", function(){

  describe( "temp", function(){


    it( "just run", function(){

      var scene = new Scene();

      var parent = new Object3D();

      var mat = new Material();

      var m1 = new Mesh( null, mat );
      var m2 = new Mesh( null, mat );
      var m3 = new Mesh( null, mat );


      scene.add( parent );
      parent.add( m1 );
      parent.add( m2 );
      parent.add( m3 );

      var p = scene.pipeline;
      var head =  p._threads[0]._rhead;

      while( head !== null ) {
        console.log( "---------" );
        console.log( head );
        console.log( "---------" );
        head = head.next;
      }



    });

  });

});

