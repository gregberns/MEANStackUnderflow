angular.module('meanStackOverflow').directive('soQuestionTags', function(){
	return {
		templateUrl: '/templates/so-question-tags.html',
		scope: {
			question: "=q"
		}
	}
})
