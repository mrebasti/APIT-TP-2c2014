'use strict';

var apitPocServices = angular.module('apitPocServices', ['ngResource']);

apitPocServices.factory('Telefono', ['$resource',
  function($resource){
    return $resource('telefonos/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'telefonos'}, isArray:true}
    });
  }]);
