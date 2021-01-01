const { watch, series, task } = require('gulp');

const { isDev, paths, dirs, browserSync } = require('../../utils');

const watchChanges = (done) => {
	if (isDev) {
		// Styles
		watch([paths.app('**', '*.s+(a|c)ss')], series('compile:styles'));

		// Templates
		watch(
			[paths.app('**', '*.pug'), paths.app('**', '*.json')],
			series('compile:templates', 'inject')
		);

		// Scripts
		watch(paths.app('**', '*.ts'), series('compile:scripts'));

		// Images
		watch(
			[
				paths.app('**', '*.{jpg,jpeg,gif,svg,png}'),
				paths.assets('**', '*.{jpg,jpeg,gif,svg,png}'),
			],
			series('imagemin')
		);

		// All other files
		watch([
			`${dirs.temporary}/**/*`,
			`!${dirs.temporary}/**/*.{css,map,html,js}`,
		]).on('change', browserSync.reload);
	}
	done();
};
watchChanges.displayName = 'watch';
watchChanges.description = "watch file's change";

task(watchChanges);
