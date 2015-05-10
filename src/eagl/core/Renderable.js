
define(
  [
    './RenderUnit',
  ],
  function(
    RenderUnit
  ){

  var Renderable = function() {
    this._units     = [];
    this._unitsMap  = {};
    this._material  = null;
    this._geometry  = null;
    this.pipeline   = null;
  };


  Renderable.prototype = {


    setMaterial : function( m ){
      if( null !== this._material ) {
        this._clearUnits();
        this._material.removeOwner( this );
      }

      this._material = m;

      if( null !== m ) {
        m.addOwner( this );

        if( this.pipeline )
          this.pipeline.updateRenderable( this );
      }


    },


    setGeometry : function( geom ){
      this._geometry = geom;
    },


    _createUnit : function( technic ){
      var pass, unit;
      if( this._material ) {
        pass = this._material.getPass( technic );
        if( pass )
          unit = new RenderUnit( pass );
      }

      return unit;
    },


    getUnit : function( technic ){
      var tid = technic.id,
          unit = this._unitsMap[ tid ];

      if( !unit ){
        unit = this._createUnit( technic );
        if( unit ) {
          this._units.push( unit );
          this._unitsMap[ tid ] = unit;
        }
      }
      return unit;
    },


    //
    // called by material
    // when passes changed
    //
    invalidatePasses : function(){
      this._buildUnits();
    },


    _clearUnits : function(){
      var units = this._units;
      for (var i = 0, l = units.length; i < l; i++) {
        units[i].remove();
      }
      units.length = 0;
      this._unitsMap = {};
    }




  };

  return Renderable;

});