module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		srcPath: '.',
		buildPath: './output',
		concat: {
			js: {
				src: ['js/jQuery.js','js/util.js','js/Grid.js','js/Bullet.js','js/Tank.js','js/NPCTank.js','js/MyTank.js','js/TankContainer.js','js/Game.js'],
				dest: '<%= buildPath %>/all.js'
			}
		},
		cssmin: {
			css: {
				files: {
					'<%= buildPath %>/all.min.css': ['css/master.css']
				}
			}
		},
		uglify : {
			options: {
				compress: {
					drop_console: true
				}
			},
			dist: {
				files: {
					'<%= buildPath %>/all.min.js': ['<%= buildPath %>/all.js']
				}
			}
		},
		processhtml: {
			dist : {
				files: {
					'<%= buildPath %>/index.html': ['index.html']
				}
			}
		},
		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true,
				minifyJS: true,
				minifyCSS: true
			},
			dist: {
				files: {
					'<%= buildPath %>/index.html': '<%= buildPath %>/index.html'
				}
			}
		},
		clean: ['<%= buildPath %>/all.js'],
		ftpush: {
			build: {
				auth: {
					host: 'www.markliublog.com',
					port: 21,
					authKey: 'key1'
				},
				src: '<%= buildPath %>',
				dest: '/c/tankwar',
				simple: false
			}
		},
		watch: {
			scripts: {
				files: '**/*.*',
				tasks: ['default'],
				options: {

				}
			}
		}

	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ftpush');
	grunt.registerTask('default', ['concat', 'cssmin', 'uglify', 'processhtml', 'htmlmin', 'clean']);
	grunt.registerTask('deploy', ['default', 'ftpush']);
};