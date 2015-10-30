angular.module('meanStackOverflow').filter('commaBreak', function(){
	return function(value){
		if (!value) return;
		if( !value.length ) return;
    	return value.split(',');
	}
})
