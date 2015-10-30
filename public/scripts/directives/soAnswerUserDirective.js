angular.module('meanStackOverflow').directive('soAnswerUser', function(){
	return {
		templateUrl: '/templates/so-answer-user.html',
		scope: {
			answer: "=a"
		}
	}
})
