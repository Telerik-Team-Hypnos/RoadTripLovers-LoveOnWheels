'use strict';

appMain.filter('transformGender', function () {
	return function (gender) {
		var rootImgFolder = '/content/img/';
		if (gender === 'Male') {
			return  rootImgFolder + 'mars-spear.png';
		} else if (gender === 'Female') {
			return  rootImgFolder + 'venus-mirror.png';
		} else {
			return  rootImgFolder + 'confused.png';
		}
	};
});