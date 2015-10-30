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
            url: "/users/new",
            templateUrl: "partials/newUser.html",
            controller: 'NewUserCtrl'
        })
        .state('users', {
            url: "/users",
            templateUrl: "partials/users.html",
            controller: 'MainCtrl'
        })
        .state('newQuestion', {
            url: "/questions/new",
            templateUrl: "partials/newQuestion.html",
            controller: 'NewQuestionCtrl'
        })
        .state('questions', {
            url: "/questions",
            templateUrl: "partials/questions.html",
            controller: 'MainCtrl'
        })
        .state('question', {
            url: "/questions/:questionId",
            templateUrl: "partials/questions.detail.html",
            controller: 'QuestionCtrl'
        })
});



