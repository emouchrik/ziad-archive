(function(){
  'use strict';

  angular.module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['DataService'];
  function MainController(DataService){
    var vm = this;
    vm.title = 'AngularJS Scaffold';
    vm.userName = 'Guest';
    vm.items = DataService.getItems();
  }
})();
