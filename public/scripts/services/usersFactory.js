angular.module('meanStackOverflow')
.factory('users', ['$http', function($http){
  
  var u = {
		_userList: [],
		userList: function(){
			return u._userList;
		},
		getAll: function(){
			var p = $http.get('/api/users');
			p.success(function(data){
				angular.extend(u._userList, data);
			});
			return p 
		},
		addUser: function(name, email){
			return $http.post('/api/users', {name: name, email: email}).success(function(data){
				u._userList.push(data);
			});
		}
	};
	return u;
}]);
