angular.module('meanStackOverflow')
.controller('UserListCtrl', [
'$scope',
'$state',
'users',
function($scope, $state, users){
	$scope.users = users;
	
	$scope.users.getAll()
	
	$scope.removeUser = function(user){
		$scope.users.removeUser(user)
	}
	
}]);
