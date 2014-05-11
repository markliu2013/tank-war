function BulletContainer() {
	this.bullets = [];
	this.checkWhichBullet = function(coordinate) {
		var result = null;
		var bulletsLength = this.bullets.length;
		for (var i=0; i<bulletsLength; i++) {
			var bullet = this.bullets[i];
			if (checkEqual(coordinate, bullet.coordinate)) {
				result = bullet;
				this.bullets.splice(i,1);
				break;
			}
		}
		return result;
	}
}