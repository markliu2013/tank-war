var gridRowsNum = 51;
var gridColsNum = 51;
var bulletSpeed = 20; //the millisecond to move a grid
var NPCTanksCount = 4;
var NPCTankSpeed = 500;

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

function getRandomNum(min, max) {
	var range = max - min;
	var rand = Math.random();
	return (min + Math.round(rand * range));
}

function setIntervalX(callback, delay, repetitions, afterCall) {
	var x = 0;
	var intervalID = window.setInterval(function () {
		callback();
		if (++x === repetitions) {
			window.clearInterval(intervalID);
			afterCall();
		}
	}, delay);
}
