
var expect  = require('expect.js');
var lreq    = require( "./lrequire" );
var aequal  = require( './aequal' );

var Object3D  = lreq( 'eagl/objects/Object3D' );
var Mesh      = lreq( 'eagl/objects/Mesh' );
var Scene     = lreq( 'eagl/objects/Scene' );
var Material  = lreq( 'eagl/materials/Material' );

createUnit = function( p, name ){
  var u  = new RenderUnit();
  u._thread = p;
  u.name = name;
  return u;
};

createRenderable = function( name ) {
  var r = new Renderable();
  r._units.push( createUnit( -5, name+"_u_-5" ) );
  r._units.push( createUnit(  0, name+"_u_0" ) );
  r._units.push( createUnit(  5, name+"_u_5" ) );
  return r;
}

createObject = function( name ){
  var m = new Mesh();
  m.name = name;
  m._renderable = createRenderable( name );
  return m;
}

describe( "objects - Scene", function(){

  describe( "temp", function(){


    it( "just run", function(){

      var scene = new Scene();
      var parent = new Object3D();

      scene.add( parent );

      parent.add( createObject( "m0" ) );
      parent.add( createObject( "m1" ) );
      parent.add( createObject( "m2" ) );


      var p = scene.pipeline;

      for (var i = 0, l = p._threads.length; i < l; i++) {
        var t = p._threads[i];
        t._rhead.name = "head_" + t._priority;
        t._rtail.name = "tail_" + t._priority;
      }

      var head =  p._threads[0]._rhead;
      var names = [];

      while( head !== null ) {
        names.push( head.name );
        head = head.next;
      }

      var should = [
        'head_-5', 'm2_u_-5', 'm1_u_-5', 'm0_u_-5', 'tail_-5',
        'head_0', 'm2_u_0', 'm1_u_0', 'm0_u_0', 'tail_0',
        'head_5', 'm2_u_5', 'm1_u_5', 'm0_u_5', 'tail_5'
      ];

      expect( names ).to.be.eql( should );

    });

  });

});

