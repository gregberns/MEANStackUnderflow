angular.module('meanStackOverflow')
.controller('NewQuestionCtrl', [
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
	
  	$scope.addQuestion = function(){
		if(!$scope.data.title || $scope.data.title === '') { return; }
		if(!$scope.data.content || $scope.data.content === '') { return; }
		
		var question = {
			user: { _id: $scope.data.userId },
			title: $scope.data.title,
			content: $scope.data.content
		}
		
		question.tags = $scope.data.tags.replaceAll(' ', ',');
		
		$scope.questions.addQuestion(question).success(function(data){
			$scope.questions.questionList().push(data);
		});
						
		$scope.data.title = '';
		$scope.data.content = '';
		$scope.data.tags = '';
		
		$state.go('questions');
	};
		
}]);
