var BASE_PATH = "../../build/commonjs/";

module.exports = function( id ) {
  return require( BASE_PATH + id );
};