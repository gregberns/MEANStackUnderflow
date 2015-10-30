
angular.module('meanStackOverflow').controller('QuestionCtrl', [
'$scope',
'$state',
'$stateParams',
'questions',
'users',
function($scope, $state, $stateParams, questions, users){
	$scope.$state = $state;
	$scope.questions = questions;
	$scope.users = users;
	
	$scope.data = {
		question: {
			_id: $stateParams.questionId,	
		},
		answerUserId: '',
		answerContent: '',
		usersList: [],
		testDate: new Date()
	}
	
	$scope.users.getAll().success(function(data){
		$scope.data.usersList = data;
	});
	
	$scope.questions.getQuestion($scope.data.question._id).success(function(data){
		console.log(data)
		$scope.data.question = data;
	});
	
	$scope.upVoteQuestion = function(question) {
		$scope.questions.upvoteQuestion(question._id).success(function(data){
			$scope.data.question = data;
		});
	};
	
	$scope.downVoteQuestion = function(question) {
		$scope.questions.downvoteQuestion(question._id).success(function(data){
			$scope.data.question = data;
		});
	};
	
	$scope.removeQuestion = function(question) {
		$scope.questions.removeQuestion($scope.data.question._id).success(function(data){
			$scope.$state.go('questions');
		});
	}
	
	$scope.addAnswer = function(){
		if(!$scope.data.answerContent || $scope.data.answerContent === '') { return; }
		
		var answer = {
			user: {_id: $scope.data.answerUserId},
			content: $scope.data.answerContent
		};
		
		$scope.questions.addAnswer($scope.data.question._id, answer).success(function(data){
			$scope.data.question = data;
		});
		
		$scope.data.answerUserId = '';
		$scope.data.answerContent = '';		
	};
	
	$scope.upVoteAnswer = function(answer) {
		$scope.questions.upvoteAnswer($scope.data.question._id, answer._id).success(function(data){
			$scope.data.question = data;
		});
	};
	
	$scope.downVoteAnswer = function(answer) {
		$scope.questions.downvoteAnswer($scope.data.question._id, answer._id).success(function(data){
			$scope.data.question = data;
		});
	};
	
	$scope.removeAnswer = function(answer){
		$scope.questions.removeAnswer($scope.data.question._id, answer).success(function(data){
			console.log('Remove Answer');
			console.log(data);
			$scope.data.question = data;
		});
	};
	
}]);