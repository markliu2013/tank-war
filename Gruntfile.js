module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			master : {
				src: ['js/jQuery.js','js/util.js','js/Grid.js','js/Bullet.js','js/Tank.js','js/NPCTank.js','js/MyTank.js','js/TankContainer.js','js/Game.js'],
				dest: 'dest/master.js'
			}
		},
		uglify : {
			options : {
				banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build : {
				src : 'dest/master.js',
				dest : 'dest/master.min.js'
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['concat', 'uglify']);
};