angular.module('meanStackOverflow').directive('soQuestionUser', function(){
	return {
		templateUrl: '/templates/so-question-user.html',
		scope: {
			question: "=q"
		}
	}
})