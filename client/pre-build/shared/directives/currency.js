angular.module('Mediamath')
.directive('currency', function () {
  return {
    require: 'ngModel',
    link: function(elem, $scope, attrs, ngModel){
      ngModel.$formatters.push(function(val){
          return '$' + val
      });
    }
  }
})