
define(
  [
    './RenderUnit',
  ],
  function(
    RenderUnit
  ){

//  ╔═╗╦╔═╗╔═╗╦  ╦╔╗╔╔═╗
//  ╠═╝║╠═╝║╣ ║  ║║║║║╣
//  ╩  ╩╩  ╚═╝╩═╝╩╝╚╝╚═╝

  function Pipeline(){

    this._renderables = [];
    this._viewports = [];
    this._technics  = [];

  }

  Pipeline.prototype = {


    addRenderable : function( r ){
      // todo !!! check if already pushed
      this._renderables.push( r );
      var techs = this._technics,
          unit;

      for (var i = 0, l = techs.length; i < l; i++) {
        unit = r.getUnit( techs[i] );
        if( unit )
          techs[i].addUnit( unit );
      };

    },

    removeRenderable : function( r ){
      var ar = this._renderables,
          i = ar.indexOf( r ),
          techs = this._technics,
          unit;

      if( i > -1 ){

        ar.splice( i, 1 );

        for (var i = 0, l = techs.length; i < l; i++) {
          unit = r.getUnit( techs[i] );
          if( unit )
            techs[i].removeUnit( unit );
        };
      }
    },


    //
    // technics related stuffs
    //

    addTechnic : function( technic ){
      var map = this._technicMap,
          renderables = this._renderables,
          unit;

      if( map[id] === undefined ) {
        map[technic.id] = technic;
        this._technics.push( technic );
      }

      for (var i = 0, l = renderables.length; i < l; i++) {
        unit = renderables[i].getUnit( technic );
        if( unit )
          technic.addUnit( unit );
      };
    },


    removeTechnic : function( technic ){
      var map = this._technicMap,
          arr = this._technics;
      if( map[id] !== undefined ) {
        delete map[technic.id];
        arr.splice( arr.indexOf( technic ) );
      }

      // todo !!! delete units from renderables
    },

    getTechnic : function( id ){
      return this._technicMap[id];
    }


  };

  return Pipeline;

});