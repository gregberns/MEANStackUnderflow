angular.module('meanStackOverflow')
.controller('UserListCtrl', [
'$scope',
'$state',
'users',
function($scope, $state, users){
	$scope.users = users;
	
	//init
	$scope.users.getAll()
	
	$scope.removeUser = function(user){
		$scope.users.removeUser(user)
	}
	
}]);
