
define( [
    './GLConfig'
  ],function(
    GLConfig
  ){

  var ConfigStack = GLConfig.ConfigStack,
      _patch = new GLConfig();


  function GLContext( gl ){
    this.gl = gl;

    this._cfg = new GLConfig();
    this._cfg.fromGL( gl );

    this.cfgStack = new ConfigStack();

    this._validCfg = false;
  }

  GLContext.prototype = {

    pushConfig : function( cfg ){
      this.cfgStack.push( cfg );
      this._validCfg = false;
    },


    popConfig : function() {
      this.cfgStack.pop();
      this._validCfg = false;
    },

    applyConfig : function(){
      this.cfgStack.patch( this._cfg, _patch );
      _patch.setupGL( this.gl );
      this._validCfg = true;
    }




  };

  return GLContext;

});