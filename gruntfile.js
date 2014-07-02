module.exports = function(grunt) {

	// 1. All configuration goes here 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {   
			dist: {
				src: [
					'lib/js/plugins/*.js',
					'lib/js/main.js',
				],
				dest: 'assets/js/production.js'
			}
		},
		uglify: {
			build: {
				src: 'assets/js/production.js',	
				dest: 'assets/js/production.min.js'
			}
		},
		imagemin: {
		    dynamic: {
		        files: [{
		            expand: true,
		            cwd: 'images/',
		            src: ['**/*.{png,jpg,gif}'],
		            dest: 'images/build/'
		        }]
		    }
		},
		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					// target.css file: source.less file
					"assets/css/style.css": "lib/less/style.less"
				}
			}
		},
		// imagemin: {
		//     dynamic: {
		//         files: [{
		//             expand: true,
		//             cwd: 'lib/',
		//             src: ['**/*.{png,jpg,jpeg,gif}'],
		//             dest: 'images/'
		//         }]
		//     }
		// }, 
		watch: {
			options: {
				livereload: true,
			},
		    scripts: {
		        files: ['lib/js/*.js'],
		        tasks: ['concat', 'uglify'],
		        options: {
		            spawn: false,
		        },
		    },
		    styles: {
		    	files: ['lib/less/*.less'],
		    	tasks: ['less'],
		    	options: {
		    		nospawn: true
		    	}
		    }, 
		    // images: {
		    // 	files: ['lib/assets/img/*.{png,jpg,.gif,jpeg}'],
		    // 	tasks: ['imagemin'],
		    // 	options: {
		    // 		spawn: false,
		    // 	}
		    // }
		}
	});

	// 3. Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['watch']);

};