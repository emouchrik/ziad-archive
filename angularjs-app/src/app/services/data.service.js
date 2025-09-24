(function(){
  'use strict';

  angular.module('app')
    .service('DataService', DataService);

  function DataService(){
    var items = ['Ticket A', 'Ticket B', 'Ticket C'];

    this.getItems = function(){
      return items;
    };
  }
})();
