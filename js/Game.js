/**
 * Class Game, control the game
 * @constructor
 */
function Game() {
	this.status = 1;// 1 stopped  2 running  3 paused
	this.grid = null;
	this.init = function init() {
		this.grid = new Grid(gridRowsNum, gridColsNum);
		this.grid.init();
	}
	this.startNew = function() {
		var tankContainer = new TankContainer();
		var tank = new MyTank([2,3], 40);
		tank.init();
		tankContainer.tanks.push(tank);
	}
}