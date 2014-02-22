
define( function( ){




  function GLContext( gl ){
    this.gl = gl;
    this.cgfStack = new ConfigStack();
    this.cfgStack.fetch( gl );
  }

  GLContext.prototype = {

    pushConfig : function( cfg ){

    },


    popConfig : function() {

    }


  };

  return GLContext;

});