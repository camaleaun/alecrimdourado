/*globals module*/
module.exports = function (grunt) {
	'use strict';
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dir: {
			bower:     'bower_components/',
			wordpress: 'www/',
			content:   '<%= dir.wordpress %>wp-content/',
			themes:    '<%= dir.content %>themes/'
		},
		shell: {
			bowerInstall: {
				command: 'bower install'
			},
			composer: {
				command: [
					'curl -sS https://getcomposer.org/installer | php',
					'php composer.phar install'
				].join('&&')
			},
			wpCoreDownload: {
				command: 'php wp-cli.phar core download --locale=pt_BR'
			},
			wpCleanup: {
				command: 'rm -rf <%= dir.content %>plugins/akismet <%= dir.content %>plugins/hello.php <%= dir.themes %>twenty* <%= dir.content %>languages/themes/twenty* <%= dir.content %>languages/plugins/akismet* <%= dir.wordpress %>readme.html'
			}
		},
		wget: {
			wpCli: {
				files: {
					'wp-cli.phar': 'https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar'
				}
			}
		}
	});

	// Load the plugin that provides the "less" task.
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-wget');

	// Default task(s).
	grunt.registerTask('wpInstall', ['wget:wpCli', 'shell:wpCoreDownload', 'shell:wpCleanup']);
	grunt.registerTask('install', ['wpInstall']);

	grunt.registerTask('default', ['install']);

};
