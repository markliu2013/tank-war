/**
 * Class Game, control the game
 * @constructor
 */
function Game() {

	this.status = 0;// 0 stopped  1 running  2 paused
	this.grid = null;
	this.tankContainer = null;
	this.myTank = null;
	this.thread = null;
	this.score = 0;

	this.init = function init() {
		var thisGame = this;
		this.loadConfig();
		gridRowsNum = parseInt(jQuery('#select-gridRowNum').val());
		gridColsNum = parseInt(jQuery('#select-gridColNum').val());
		bulletSpeed = parseInt($('#select-bullet-speed').val());
		NPCTanksCount = parseInt($('#select-npctank-count').val());
		NPCTankSpeed = parseInt($('#select-npctank-speed').val());
		NPCTankCheckTime = parseInt($('#select-npctank-time').val());
		NPCTankFireTimes = parseInt($('#select-npctank-fire').val());
		thisGame.status = 1;
		thisGame.grid = new Grid(gridRowsNum, gridColsNum);
		thisGame.grid.init();
		bindControlEvent.call(thisGame);
		thisGame.tankContainer = new TankContainer();
		thisGame.myTank = new MyTank([Math.ceil(gridColsNum/2),Math.ceil(gridRowsNum/2)], getRandomNum(37, 40));
		thisGame.myTank.init();
		thisGame.tankContainer.tanks.push(this.myTank);
		addNPCTank.call(thisGame);
		jQuery('#pause-game').removeClass('disabled');
		jQuery('#reset-game').removeClass('disabled');
		thisGame.thread = setInterval(function() {
			if (thisGame.tankContainer.tanks.length-1 < NPCTanksCount) {
				addNPCTank.call(thisGame);
			}
		}, NPCTankCheckTime);
		$('#game-state').text(gameStateText[thisGame.status]);
	}
	this.startNew = function() {
		var thisGame = this;
		gridRowsNum = parseInt($('#select-gridRowNum').val());
		gridColsNum = parseInt($('#select-gridColNum').val());
		bulletSpeed = parseInt($('#select-bullet-speed').val());
		NPCTanksCount = parseInt($('#select-npctank-count').val());
		NPCTankSpeed = parseInt($('#select-npctank-speed').val());
		NPCTankCheckTime = parseInt($('#select-npctank-time').val());
		NPCTankFireTimes = parseInt($('#select-npctank-fire').val());
		saveConfigAsLocalStorage();
		thisGame.status = 1;
		thisGame.score = 0;
		jQuery('#score-num').text(this.score);
		thisGame.grid.rowsNum = gridRowsNum;
		thisGame.grid.colsNum = gridColsNum;
		thisGame.grid.draw();
		for (var i=0; i<thisGame.tankContainer.tanks.length; i++) {
			var tank = thisGame.tankContainer.tanks[i];
			tank.destroy();
		}
		thisGame.tankContainer.tanks.length = 0;
		thisGame.myTank.reset();
		thisGame.myTank.keyBoardControl();
		thisGame.tankContainer.tanks.push(thisGame.myTank);
		addNPCTank.call(thisGame);
		$('#pause-game').removeClass('disabled');
		$('#reset-game').removeClass('disabled');
		clearInterval(thisGame.thread);
		thisGame.thread = setInterval(function() {
			if (thisGame.tankContainer.tanks.length-1 < NPCTanksCount) {
				addNPCTank.call(thisGame);
			}

		}, NPCTankCheckTime);
		$('#game-state').text(gameStateText[thisGame.status]);
	}

	this.pauseGame = function() {
		this.status = 2;
		clearInterval(this.thread);
		for (var i=0; i<this.tankContainer.tanks.length; i++) {
			var tank = this.tankContainer.tanks[i];
			clearInterval(tank.thread);
		}
		this.myTank.offKey();
		$('#pause-game').text('继续');
		$('#pause-game').addClass('paused');
		$('#game-state').text(gameStateText[this.status]);
	}

	this.stopGame = function() {
		this.status = 0;
		clearInterval(this.thread);
		for (var i=0; i<this.tankContainer.tanks.length; i++) {
			var tank = this.tankContainer.tanks[i];
			clearInterval(tank.thread);
		}
		this.myTank.offKey();
		$('#pause-game').addClass('disabled');
		$('#game-state').text(gameStateText[this.status]);
	}

	this.addScore = function() {
		jQuery('#score-num').text(++this.score);
	}

	this.continueGame = function() {
		var thisGame = this;
		thisGame.status = 1;
		thisGame.thread = setInterval(function() {
			if (thisGame.tankContainer.tanks.length-1 < NPCTanksCount) {
				addNPCTank.call(thisGame);
			}
		}, NPCTankCheckTime);
		for (var i=0; i<this.tankContainer.tanks.length; i++) {
			var tank = this.tankContainer.tanks[i];
			if (tank.run) {
				tank.run();
			}
		}
		this.myTank.keyBoardControl();
		$('#pause-game').text('暂停');
		$('#pause-game').removeClass('paused');
		$('#game-state').text(gameStateText[thisGame.status]);
	}

	function addNPCTank() {
		var npcTank = NPCTank.getRandTank();
		npcTank.init();
		this.tankContainer.tanks.push(npcTank);
	}
	function bindControlEvent() {
		var thisGame = this;
		$('#start-game').on('click', function(event) {
			thisGame.startNew();
			return false;
		});
		$('#pause-game').on('click', function(event) {
			if ($(this).hasClass('disabled')) {
				return false;
			}
			if ($(this).hasClass('paused')) {
				thisGame.continueGame();
			} else {
				thisGame.pauseGame();
			}
			return false;
		});
		jQuery('#reset-game').on('click', function(event) {
			thisGame.resetConfig();
			thisGame.startNew();
		});
	}

	function saveConfigAsCookie() {

	}

	function saveConfigAsLocalStorage() {
		var gridRowsNum = jQuery('#select-gridRowNum').val();
		var gridColsNum = jQuery('#select-gridColNum').val();
		var bulletSpeed = jQuery('#select-bullet-speed').val();
		var NPCTanksCount = jQuery('#select-npctank-count').val();
		var NPCTankSpeed = jQuery('#select-npctank-speed').val();
		var NPCTankCheckTime = jQuery('#select-npctank-time').val();
		var NPCTankFireTimes = jQuery('#select-npctank-fire').val();
		localStorage.setItem('gridRowsNum', gridRowsNum);
		localStorage.setItem('gridColsNum', gridColsNum);
		localStorage.setItem('bulletSpeed', bulletSpeed);
		localStorage.setItem('NPCTanksCount', NPCTanksCount);
		localStorage.setItem('NPCTankSpeed', NPCTankSpeed);
		localStorage.setItem('NPCTankCheckTime', NPCTankCheckTime);
		localStorage.setItem('NPCTankFireTimes', NPCTankFireTimes);
	}

	this.getConfig = function() {
		var result = {};
		result.gridRowsNum = localStorage.getItem('gridRowsNum') || gridRowsNum;
		result.gridColsNum = localStorage.getItem('gridColsNum') || gridColsNum;
		result.bulletSpeed = localStorage.getItem('bulletSpeed') || bulletSpeed;
		result.NPCTanksCount = localStorage.getItem('NPCTanksCount') || NPCTanksCount;
		result.NPCTankSpeed = localStorage.getItem('NPCTankSpeed') || NPCTankSpeed;
		result.NPCTankCheckTime = localStorage.getItem('NPCTankCheckTime') || NPCTankCheckTime;
		result.NPCTankFireTimes = localStorage.getItem('NPCTankFireTimes') || NPCTankFireTimes;
		return result;
	}

	this.resetConfig = function() {
		localStorage.setItem('gridRowsNum', 51);
		localStorage.setItem('gridColsNum', 51);
		localStorage.setItem('bulletSpeed', 20);
		localStorage.setItem('NPCTanksCount', 4);
		localStorage.setItem('NPCTankSpeed', 500);
		localStorage.setItem('NPCTankCheckTime', 3000);
		localStorage.setItem('NPCTankFireTimes', 1);
		this.loadConfig();
	}

	this.loadConfig = function() {
		var config = this.getConfig();
		jQuery('#select-gridRowNum').val(config.gridRowsNum);
		jQuery('#select-gridColNum').val(config.gridColsNum);
		jQuery('#select-bullet-speed').val(config.bulletSpeed);
		jQuery('#select-npctank-count').val(config.NPCTanksCount);
		jQuery('#select-npctank-speed').val(config.NPCTankSpeed);
		jQuery('#select-npctank-time').val(config.NPCTankCheckTime);
		jQuery('#select-npctank-fire').val(config.NPCTankFireTimes);
	}

}