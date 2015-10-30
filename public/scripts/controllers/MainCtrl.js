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
		//userList: $scope.users.userList(),
		//questionsList: $scope.questions.questionList(),
		
		userId: '',
		title: '',
		content: '',
		tags: ''
		
	};
	
	//init
	$scope.users.getAll()
	$scope.questions.getAll()
	// 
  	// $scope.addQuestion = function(){
	// 	if(!$scope.data.title || $scope.data.title === '') { return; }
	// 	if(!$scope.data.content || $scope.data.content === '') { return; }
	// 	
	// 	var question = {
	// 		user: { _id: $scope.data.userId },
	// 		title: $scope.data.title,
	// 		content: $scope.data.content
	// 	}
	// 	
	// 	question.tags = $scope.data.tags.replaceAll(' ', ',');
	// 	
	// 	$scope.questions.addQuestion(question).success(function(data){
	// 		$scope.questionList.push(data);
	// 	});
	// 					
	// 	$scope.data.title = '';
	// 	$scope.data.content = '';
	// 	$scope.data.tags = '';
	// 	
	// 	$state.go('questions');
	// };
	
	$scope.incrementVotes = function(question) {
		question.votes += 1;
	};
	
}]);
