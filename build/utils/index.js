const gulpLoadPlugins = require('gulp-load-plugins');
const browserSyncLib = require('browser-sync');
const notify = require('gulp-notify');
const colors = require('ansi-colors');
const beeper = require('beeper');

const { paths, dirs, taskTarget } = require('./paths');
const { config } = require('./config');
const { args, isDev } = require('./env');

// Load all gulp plugins based on their names
// EX: gulp-copy -> copy
const plugins = gulpLoadPlugins({
	rename: {
		'gulp-sass-lint': 'sassLint',
	},
});

// Create a new browserSync instance
const browserSync = browserSyncLib.create();

// Error handle
const reportError = function (error) {
	// [log]
	//console.log(error);

	// Format and ouput the whole error object
	//console.log(error.toString());

	// ----------------------------------------------
	// Pretty error reporting

	var report = '\n';
	var chalk = colors.white.bgRed;

	if (error.plugin) {
		report += chalk('PLUGIN:') + ' [' + error.plugin + ']\n';
	}

	if (error.message) {
		report += chalk('ERROR: ') + ' ' + error.message + '\n';
	}

	console.error(report);

	// ----------------------------------------------
	// Notification

	if (error.line && error.column) {
		var notifyMessage = 'LINE ' + error.line + ':' + error.column + ' -- ';
	} else {
		var notifyMessage = '';
	}

	notify({
		title: 'FAIL: ' + error.plugin,
		message: `${notifyMessage}${error.message}`,
		sound: 'Frog', // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
	}).write(error);

	beeper('****-*-*'); // System beep (backup)

	// ----------------------------------------------
	// Prevent the 'watch' task = require (stopping

	this.emit('end');
};

const mainBundle = config.build.mainBundle;

const pluginErrorHandle = () =>
	plugins.plumber({
		errorHandler: reportError,
	});

module.exports = {
	args,
	config,
	paths,
	plugins,
	browserSync,
	reportError,
	pluginErrorHandle,
	taskTarget,
	isDev,
	dirs,
	colors,
	mainBundle,
};
