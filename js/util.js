var gridRowsNum = 50;
var gridColsNum = 50;
var bulletSpeed = 20; //the millisecond to move a grid

/**
 * check if the two coordinates is the same
 */
function checkEqual(coordinates1, coordinates2) {
	if ( coordinates1[0]===coordinates2[0] && coordinates1[1]===coordinates2[1] ) {
		return true;
	} else {
		return false;
	}
}

function randomDir() {
	var result = getRandomNum(min, max)
	return result;
}

function getRandomNum(min, max) {
	var range = max - min;
	var rand = Math.random();
	return (min + Math.round(rand * range));
}

