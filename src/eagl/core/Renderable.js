
define(
  [
    './RenderUnit',
  ],
  function(
    RenderUnit
  ){

  var Renderable = function() {
    this._units     = [];
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
        this._buildUnits();
      }

    },


    //
    // called by material
    // when passes changed
    //
    invalidatePasses : function(){
      this._buildUnits();
    },



    setPipeline : function( p ){
      var current = this.pipeline;
      if( current !== null )
        current.removeUnits( this._units );

      this.pipeline = p;
      if( p !== null )
        p.addUnits( this._units );
    },



    addUnit : function( unit ){
      this._units.push( unit );
      var p = this.pipeline;
      if( p !== null )
        p.addUnit( unit );
    },



    removeUnit : function( unit ){
      var index = this._units.indexOf( unit ),
          p = this.pipeline;

      if( index > -1 ) {

        this._units.splice( index, 1 );
        if( p !== null )
          p.removeUnit( unit );
      }
    },



    getUnits : function(){
      return this._units;
    },



    _clearUnits : function(){
      var units = this._units;
      var p = this.pipeline;
      if( p !== null ) {
        for (var i = 0, l = units.length; i < l; i++) {
          p.removeUnit( units[i] );
        }
      }
      units.length = 0;
    },



    _buildUnits : function() {
      var mat     = this._material,
          geom    = this._geometry,
          units   = this._units,
          passes  = mat._passes,
          unit;

      this._clearUnits();

      for (var i = 0, l = passes.length; i < l; i++) {
        unit = new RenderUnit();
        unit.pass = passes[i];
        unit.geom = geom;
        this.addUnit( unit );
      }

    }




  };

  return Renderable;

});