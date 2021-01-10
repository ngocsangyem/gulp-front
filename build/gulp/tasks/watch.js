const { watch, series, task, parallel } = require('gulp');
const del = require('del');
const { relative, resolve, sep, join } = require('path');

const { isDev, paths, dirs, browserSync, taskTarget } = require('../../utils');

const cleaningImages = async (file) => {
	const config = {
		force: true,
		dot: true,
	};
	let filePathSrc;
	let filePathBuild;

	if (file.includes(paths._app)) {
		let array = relative(paths._app, file)
			.split(sep)
			.slice(1)
			.filter((f) => f !== dirs.assets);
		let asset = [array[0]].concat(array.slice(1)).join(sep);

		filePathBuild = resolve(taskTarget, dirs.static, asset);
	} else if (file.includes(paths._assets)) {
		filePathSrc = relative(paths._assets, file).split(sep).join(sep);
		filePathBuild = resolve(taskTarget, filePathSrc);
	}
	console.log(` \u{1b}[32mDelete: ${filePathBuild}\u{1b}[0m`);

	await del(filePathBuild, config);
};

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
			paths.assets('**', '*.{jpg,jpeg,gif,svg,png}'),
			series('imagemin')
		).on('unlink', (file) => cleaningImages(file));

		watch(
			paths.app('**', '*.{jpg,jpeg,gif,svg,png}'),
			series('assets')
		).on('unlink', (file) => cleaningImages(file));

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
