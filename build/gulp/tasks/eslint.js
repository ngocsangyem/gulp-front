const { task, src } = require('gulp');
const { plugins, browserSync, dirs } = require('../../utils');

const inputs = () => [
	'**/*.js',
	// Ignore all vendor folder files
	'!**/tmp/**/*',
	'!**/build/**/*',
];

const eslint = () =>
	src(inputs(), { cwd: dirs.source })
		.pipe(browserSync.reload({ stream: true, once: true }))
		.pipe(
			plugins.eslint({
				useEslintrc: true,
			})
		)
		.pipe(plugins.eslint.format())
		.pipe(plugins.if(!browserSync.active, plugins.eslint.failAfterError()))
		.on('error', function () {
			if (!browserSync.active) {
				process.exit(1);
			}
		});
eslint.description = `check and format code by eslint rule`;
eslint.flags = {
	'--eslint': `check and format code by eslint rule`,
};

task(eslint);
