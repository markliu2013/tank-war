/**
 * Class Game, control the game
 * @constructor
 */
function Game() {
	this.status = 1;// 1 stopped  2 running  3 paused
	this.grid = null;
	this.tankContainer = null;
	this.myTank = null;

	this.init = function init() {
		this.grid = new Grid(gridRowsNum, gridColsNum);
		this.grid.init();
		bindControlEvent.call(this);
		this.startNew();
	}
	this.startNew = function() {
		this.tankContainer = new TankContainer();
		this.myTank = new MyTank([Math.ceil(gridColsNum/2),Math.ceil(gridRowsNum/2)], getRandomNum(37, 40));
		this.myTank.init();
		this.tankContainer.tanks.push(this.myTank);
		var tank2 = NPCTank.getRandTank();
		tank2.init();
		this.tankContainer.tanks.push(tank2);
		for (var i=0;i<5;i++) {
			var tank = NPCTank.getRandTank();
			tank.init();
			this.tankContainer.tanks.push(tank);
		}
		$('#pause-game').removeClass('disabled');
		$('#stop-game').removeClass('disabled');
	}

	function npcTank() {

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