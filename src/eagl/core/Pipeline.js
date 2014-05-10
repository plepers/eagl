
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
    this._viewports   = [];
    this._outputs    = [];
    this._outputsMap  = {};

  }

  Pipeline.prototype = {


    addRenderable : function( r ){
      // todo !!! check if already pushed
      r.pipeline = this;
      this._renderables.push( r );
      this.updateRenderable( r );

    },

    removeRenderable : function( r ){
      var ar = this._renderables,
          i = ar.indexOf( r ),
          outs = this._outputs,
          unit;

      if( i > -1 ){

        ar.splice( i, 1 );

        for ( i = 0, l = outs.length; i < l; i++) {
          unit = r.getUnit( outs[i] );
          if( unit )
            unit.remove();
        }
      }
    },

    updateRenderable: function( r ){
      var outs = this._outputs,
          unit;

      for (var i = 0, l = outs.length; i < l; i++) {
        unit = r.getUnit( outs[i] );
        if( unit )
          outs[i].addUnit( unit );
      }
    },


    //
    // outputs related stuffs
    //

    addOutput: function( output ){
      var map = this._outputsMap,
          renderables = this._renderables,
          id = output.id,
          unit;

      if( map[id] === undefined ) {
        map[id] = output;
        this._outputs.push( output );
      }

      for (var i = 0, l = renderables.length; i < l; i++) {
        unit = renderables[i].getUnit( output );
        if( unit )
          output.addUnit( unit );
      }
    },


    removeOutput: function( output ){
      var map = this._outputsMap,
          arr = this._outputs;

      // todo - dispose related units
      if( map[id] !== undefined ) {
        delete map[output.id];
        arr.splice( arr.indexOf( output ) );
      }

      // todo !!! delete units from renderables
    },

    getOutput: function( id ){
      return this._outputsMap[id];
    }


  };

  return Pipeline;

});