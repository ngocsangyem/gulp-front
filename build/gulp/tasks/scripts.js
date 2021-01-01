const { task, src, dest } = require('gulp');
const named = require('vinyl-named');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');

const {
	paths,
	isDev,
	dirs,
	colors,
	plugins,
	browserSync,
} = require('../../utils');
const { WebpackDevConfig } = require('../../webpack/webpack.dev');
const { WebpackProdConfig } = require('../../webpack/webpack.prod');

const inputs = () => paths.pages('**', '*.ts');

const compileWebpack = () =>
	webpackStream(
		!isDev ? WebpackProdConfig : WebpackDevConfig,
		webpack,
		function () {}
	);

const rename = () =>
	plugins.rename({
		suffix: !isDev ? '.min' : '',
	});

const output = () => dest(paths.taskTarget(dirs.scripts));

const reload = () =>
	browserSync.reload({
		stream: true,
	});

const compileScripts = () => {
	const checkFiles = require(paths.core('checkFiles'));
	checkFiles('scripts');
	return src(inputs())
		.pipe(named())
		.pipe(compileWebpack())
		.pipe(output())
		.pipe(reload());
};
compileScripts.displayName = 'compile:scripts';
compileScripts.description = `compile script source(${colors.cyan(
	paths._pages
)}) using webpack for safety wrapping output`;
compileScripts.flags = {
	'--development': 'create source maps for scripts',
	'--production': `minify scripts output for deployment from ${colors.cyan(
		paths.taskTarget(dirs.scripts)
	)}`,
};

task(compileScripts);
