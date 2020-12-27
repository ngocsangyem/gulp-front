const { sync } = require('glob');
const { task, series, parallel } = require('gulp');

const { paths } = require('./build/utils');
// Read tasks
sync(paths.tasks('**', '*.js'))
	.filter((file) => /\.(js)$/i.test(file))
	.map((file) => {
		require(file);
	});

task(
	'serve',
	series([
		'clean',
		'compile:templates',
		parallel('compile:styles', 'compile:scripts', 'imagemin', 'copy:fonts'),
		'assets',
		'inject',
		'watch',
		'browserSync',
	])
);

task(
	'build',
	series([
		'clean',
		'compile:templates',
		parallel('compile:styles', 'compile:scripts', 'imagemin', 'copy:fonts'),
		'assets',
		'inject',
		'stat',
		'sitemap',
		'done',
	])
);
