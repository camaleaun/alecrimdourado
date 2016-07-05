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
			themes:    '<%= dir.content %>themes/',
			plugins:   '<%= dir.content %>plugins/'
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
			},
			s5panfe: {
				command: 'git clone git@github.com:camaleaun/s5panfe.git <%= dir.plugins %>s5panfe'
			},
			s5buying: {
				command: 'git clone git@github.com:camaleaun/s5buying.git <%= dir.plugins %>s5buying'
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
	grunt.registerTask('install', ['wpInstall', 'shell:s5panfe', 'shell:s5buying']);

	grunt.registerTask('default', ['install']);

};
