var myApp = angular.module('myApp',['ngRoute']);


myApp.value('sat', {});

myApp.factory('MyFactory', function($q, $http){
	return {
		fff: function(page, time){
			var deffered = $q.defer();
			var promise = deffered.promise;
			setTimeout(function(){
				$http.get(page).success(function(data) {
					deffered.resolve(data);
				});
			},time * 1000);
			return deffered.promise;
		}
	};
});

    

myApp.controller('firstPageCtrl',['$scope','$http','$q', 'MyFactory', 'sat',function($scope,$http, $q, MyFactory, sat){
	$scope.page = 'data.json';
	$scope.times = 4;
	$scope.getData = function(page, time){
		MyFactory.fff(page, time).then(function(s){
			sat = s;
			$scope.data = sat;
		});	
	};
	$scope.user = {
		diam : 20,
		style : {},
	};
	$scope.f = function(user){
		user.style = { 'font-size':user.diam+'px'}
	};
	$scope.style = function(user){
		return user.style;
	};
	$scope.red = function(){
		$http.post('/').success(function(data) {
    	console.log('inredirect');
  	});
	};
}])
.controller('mainCTRL',['$scope',function($scope){
	$scope.yeah = 321;
}]);
myApp.config(function ($routeProvider,$locationProvider) {
				
        $routeProvider
        .when('/', {template: 'firstpage.html {{yeah}}',controller: 'mainCTRL'})
        .when('/todolist', {templateUrl: 'firstpage.html',controller: 'firstPageCtrl'});
        //$locationProvider.html5Mode(true);
});
