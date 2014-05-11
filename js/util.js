var gridRowsNum = 50;
var gridColsNum = 50;
var bulletSpeed = 10; //the millisecond to move a grid

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