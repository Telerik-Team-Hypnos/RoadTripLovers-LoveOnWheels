'use strict';

appMain.filter('transformDate', function () {
	return    function (date) {
		var miliseconds = Date.parse(date);
		var parsedDate = new Date(miliseconds);

		var yyyy = parsedDate.getFullYear().toString();
		var mm = (parsedDate.getMonth()+1).toString(); // getMonth() is zero-based
		var dd  = parsedDate.getDate().toString();

		return (dd[1]?dd:"0"+dd[0]) + '.' + (mm[1]?mm:"0"+mm[0]) + '.' + yyyy;
	};
});