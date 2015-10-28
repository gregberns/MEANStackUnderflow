var app = angular.module('meanStackOverflow', ['ui.router', 'angularMoment']);

String.prototype.replaceAll = function(search, replace)
{
    //if replace is not sent, return original string otherwise it will
    //replace search string with 'undefined'.
    if (replace === undefined) {
        return this.toString();
    }

    return this.replace(new RegExp('[' + search + ']', 'g'), replace);
};

app.config(function($stateProvider, $urlRouterProvider){
	 $urlRouterProvider.otherwise("/questions");
	 
	 $stateProvider
    .state('newUser', {
      url: "/newUser",
      templateUrl: "partials/newUser.html"
    })
		.state('users', {
      url: "/users",
      templateUrl: "partials/users.html"
    })
		.state('newQuestion', {
      url: "/newQuestion",
      templateUrl: "partials/newQuestion.html"
    })
		.state('questions', {
      url: "/questions",
      templateUrl: "partials/questions.html"
    })
		.state('question', {
      url: "/questions/:questionId",
      templateUrl: "partials/questions.detail.html",
			controller: 'QuestionCtrl'
    })
		
});

app.controller('QuestionCtrl', [
'$scope',
'$state',
'$stateParams',
'questions',
function($scope, $state, $stateParams, questions){
	$scope.$state = $state;
	$scope.questions = questions;
	
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
		var d = new Date(data.timeStamp)
		console.log(d.toString())
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

app.controller('MainCtrl', [
'$scope',
'$state',
'users',
'questions',
function($scope, $state, users, questions){
	$scope.users = users;
	$scope.questions = questions;	
	
	$scope.data = {
		usersList: [],
		addQuestionUserId: '',
		addQuestionTitle: '',
		addQuestionContent: '',
		addQuestionTags: '',
		questionsList: []
	};
	
	//Get users
	$scope.users.getAll().success(function(data){
		$scope.data.usersList = data;
	});
	
	$scope.questions.getAll().success(function(data){
		$scope.data.questionsList = data;
	});
	
	$scope.addUser = function() {
		if(!$scope.username || $scope.username === '') { return; }
		if(!$scope.email || $scope.email === '') { return; }
		
		$scope.users.addUser($scope.username, $scope.email).success(function(data){
			//Add new user into the list
			$scope.data.usersList.push(data);	
		});
	};
	
  	$scope.addQuestion = function(){
		if(!$scope.data.addQuestionTitle || $scope.data.addQuestionTitle === '') { return; }
		if(!$scope.data.addQuestionContent || $scope.data.addQuestionContent === '') { return; }
		
		var question = {
			user: {_id: $scope.data.addQuestionUserId},
			title: $scope.data.addQuestionTitle,
			content: $scope.data.addQuestionContent
		}
		
		question.tags = $scope.data.addQuestionTags.replaceAll(' ', ',');
		
		$scope.questions.addQuestion(question).success(function(data){
			$scope.data.questionsList.push(data);
		});
						
		$scope.data.addQuestionTitle = '';
		$scope.data.addQuestionContent = '';
		$scope.data.addQuestionTags = '';
		
		$state.go('questions');
	};
	
	$scope.incrementVotes = function(question) {
		question.votes += 1;
	};
	
}]);



app.directive('soQuestionUser', function(){
	return {
		templateUrl: '/templates/so-question-user.html',
		scope: {
			question: "=q"
		}
	}
})
app.directive('soAnswerUser', function(){
	return {
		templateUrl: '/templates/so-answer-user.html',
		scope: {
			answer: "=a"
		}
	}
})
app.directive('soQuestionTags', function(){
	return {
		templateUrl: '/templates/so-question-tags.html',
		scope: {
			question: "=q"
		}
	}
})

app.filter('commaBreak', function(){
	return function(value){
		if( !value.length ) return;
    	return value.split(',');
	}
})

app.factory('users', ['$http', function($http){
  return {
		getAll: function(){
			return $http.get('/api/users');
		},
		addUser: function(name, email){
			return $http.post('/api/users', {name: name, email: email}).success(function(data){
				return data;
			});
		}
	};
}]);

app.factory('questions', ['$http', function($http){
  return {
		getAll: function(){
			return $http.get('/api/questions');
		},
		getQuestion: function(qId){
			return $http.get('/api/questions/' + qId);
		},
		addQuestion: function(question){
			return $http.post('/api/questions', question);
		},
		upvoteQuestion: function(qId) {
			return $http.put('/api/questions/'+qId+'/upvote');
		},
		downvoteQuestion: function(qId) {
			return $http.put('/api/questions/'+qId+'/downvote');
		},
		removeQuestion: function(qId) {
			return $http.delete('/api/questions/'+qId);
		},
		addAnswer: function(qId, answer) {
			return $http.post('/api/questions/'+qId+'/answers', answer);
		},
		upvoteAnswer: function(qId, aId) {
			return $http.put('/api/questions/'+qId+'/answers/'+aId+'/upvote');
		},
		downvoteAnswer: function(qId, aId) {
			return $http.put('/api/questions/'+qId+'/answers/'+aId+'/downvote');
		},
		removeAnswer: function(qId, answer) {
			return $http.delete('/api/questions/'+qId+'/answers/'+answer._id, answer);
		}
	};
}]);