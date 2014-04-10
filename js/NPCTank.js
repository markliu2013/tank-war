function NPCTank(header, direction) {
	Tank.call(this, header, direction);
	this.init = function() {
		this.draw();
	}
	this.init();
}