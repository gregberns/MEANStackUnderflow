angular.module('meanStackOverflow')
.controller('NewUserCtrl', [
'$scope',
'$state',
'users',
'questions',
function($scope, $state, users, questions){
	$scope.users = users;
	$scope.questions = questions;	
	
	$scope.data = {
		usersList: [],
		newUserName: '',
		newUserEmail: '',
		isValidUserName: true,
		isButtonDisabled: false
	};
	
	//Get users
	$scope.users.getAll().success(function(data){
		$scope.data.usersList = data;
	});
	
	$scope.isValidUserName = function(value){
		isValidUserName = true;
		$scope.data.usersList.map(function(v){
			if (v.name === value) {
				isValidUserName = false;
			}
		})
	}
		
	$scope.addUser = function() {
		if(!$scope.data.newUserName || $scope.data.newUserName === '') { return; }
		if(!$scope.data.newUserEmail || $scope.data.newUserEmail === '') { return; }
		
		isButtonEnabled = true;
		$scope.users.addUser($scope.data.newUserName, $scope.data.newUserEmail).success(function(data){
			$state.go('users');
			isButtonEnabled = false;	
		});
	};
	
}]);
