const { task, src, dest } = require('gulp');
const pngquant = require('imagemin-pngquant');

const { paths, plugins, isDev, colors, dirs } = require('../../utils');
const { pipe } = require('../../core');

const inputs = () => paths.assets(dirs.images, '*.{jpg,jpeg,gif,svg,png}');

const output = () => dest(paths.taskTarget(dirs.images));

const imageminPlugins = () =>
	!isDev
		? plugins.imagemin(
				[
					plugins.imagemin.mozjpeg({ progressive: true }),
					plugins.imagemin.svgo({
						plugins: [{ removeViewBox: false }],
					}),
				],
				{ use: [pngquant({ speed: 10 })] }
		  )
		: pipe();

const imagemin = () =>
	src(inputs(), { cwd: paths.assets(dirs.images) })
		.pipe(plugins.changed(paths.taskTarget(dirs.images)))
		.pipe(imageminPlugins())
		.pipe(output());
imagemin.description = `copy and compress global images`;
imagemin.flags = {
	'--imagemin': `copy and compress images in ${colors.cyan(
		paths._taskTarget
	)} directory`,
};

task(imagemin);
