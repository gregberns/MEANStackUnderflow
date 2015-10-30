angular.module('meanStackOverflow')
.factory('questions', ['$http', function($http){
	var q = {
			_questionList: [],
			questionList: function() {
				return q._questionList;	
			},
			getAll: function(){
				$http.get('/api/questions').success(function(data){
					angular.extend(q._questionList, data);
				});
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
	return q;
}]);