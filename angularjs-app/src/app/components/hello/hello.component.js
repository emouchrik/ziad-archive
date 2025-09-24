(function(){
  'use strict';

  angular.module('app')
    .component('hello', {
      bindings: {
        name: '<'
      },
      template: '<div class="hello">Hello, {{$ctrl.name}}!</div>'
    });
})();
