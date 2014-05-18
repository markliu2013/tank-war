/**
 * Class Game, control the game
 * @constructor
 */
function Game() {
	this.status = 1;// 1 stopped  2 running  3 paused
	this.grid = null;
	this.tankContainer = null;
	this.init = function init() {
		this.grid = new Grid(gridRowsNum, gridColsNum);
		this.grid.init();
		bindControlEvent.call(this);
		this.startNew();
	}
	this.startNew = function() {
		this.tankContainer = new TankContainer();
		var tank = new MyTank([2,2], 40);
		tank.init();
		this.tankContainer.tanks.push(tank);
		var tank2 = new NPCTank([2,gridRowsNum-1], 38);
		tank2.init();
		tank2.fire();
		this.tankContainer.tanks.push(tank2);
		$('#pause-game').removeClass('disabled');
		$('#stop-game').removeClass('disabled');
	}

	function bindControlEvent() {
		var thisGame = this;
		$('#start-game').on('click', function(event) {
			thisGame.startNew();
			return false;
		});
		$('#pause-game').on('click', function(event) {
			if ($(this).hasClass("disabled")) {
				return false;
			}
			if ($(this).hasClass("paused")) {
				//continueGame();
			} else {
				//pauseGame();
			}
			return false;
		});
		$('#stop-game').on('click', function(event) {
			if ($(this).hasClass('disabled')) {
				return false;
			}
			stopGame();
			return false;
		})
	}
	function updateGameStateText() {
		switch (this.status) {
			case 1:
				$("#game-state").text("游戏停止");
				break;
			case 2:
				$("#game-state").text("正在游戏");
				break;
			case 3:
				$("#game-state").text("游戏暂停");
				break;
		}
	}
}