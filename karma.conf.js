const { join } = require('path');
const { dirs } = require('./build/utils');
const webpackConfig = require('./build/webpack/webpack.prod');
const _ = require('lodash');

const testFiles = join(__dirname, dirs.source) + '/**/*.test.js';
const puppeteer = require('puppeteer');
process.env.CHROME_BIN = puppeteer.executablePath();

const karmaConf = function (config) {
	config.set({
		// base path, that will be used to resolve files and exclude
		basePath: '',

		// testing framework to use (jasmine/mocha/qunit/...)
		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser
		files: [testFiles],

		// list of files to exclude
		exclude: [],

		preprocessors: {
			'./src/app/**/*.js': ['webpack'],
			'./src/app/components/**/*.js': ['coverage'],
			'./src/app/views/pages/**/*.js': ['coverage'],
		},

		webpack: {
			resolve: webpackConfig.resolve,
			module: _.extend({}, webpackConfig.module, {
				rules: [
					{
						test: /\.(ts)$/,
						exclude: /(node_modules|bower_components)/,
						loader: 'awesome-typescript-loader',
					},
				],
			}),
		},

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['progress'],

		// Setup to allow external devices to access karma tests
		// Change to '127.0.0.1' to disallow external access
		host: '0.0.0.0',

		// web server port
		port: 3012,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeHeadless
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['ChromeHeadless'],

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,

		// If browser does not have any activity for given timeout [ms], kill it
		browserNoActivityTimeout: 60000,

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false,
	});
};

module.exports = karmaConf;
