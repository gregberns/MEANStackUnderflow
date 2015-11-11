angular.module('meanStackOverflow')
.controller('MainCtrl', [
'$scope',
'$state',
'users',
'questions',
function($scope, $state, users, questions){
	$scope.users = users;
	$scope.questions = questions;	
	
	$scope.data = {
		userId: '',
		title: '',
		content: '',
		tags: ''		
	};
	
	$scope.users.getAll()
	$scope.questions.getAll()
	
	$scope.incrementVotes = function(question) {
		question.votes += 1;
	};
	
}]);
