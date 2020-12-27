const { task, src, dest } = require('gulp');
const { extname } = require('path');

const Fiber = require('fibers');
const cssDeclarationSorter = require('css-declaration-sorter');
const autoprefixer = require('autoprefixer');
const sortMedia = require('postcss-sort-media-queries');
const cssnano = require('cssnano');

const {
	paths,
	plugins,
	isDev,
	pluginErrorHandle,
	dirs,
	browserSync,
	colors,
	config,
	mainBundle,
} = require('../../utils');
const { pipe } = require('../../core');
const { store } = require('../../utils/store');

const postCssPlugins = [
	sortMedia(),
	autoprefixer({
		grid: true,
	}),
	cssDeclarationSorter({
		order: 'concentric-css',
	}),
	cssnano(),
];

const inputs = () => paths.pages('**', '*.s+(a|c)ss');

const sourcemapsInit = () =>
	isDev ? plugins.sourcemaps.init({ largeFile: true }) : pipe();

const compileSass = () =>
	plugins.sass({
		fiber: Fiber,
		outputStyle: 'expanded',
		precision: 10,
	});

const sourcemapsWrite = () => (isDev ? plugins.sourcemaps.write() : pipe());

const postCss = () => (isDev ? plugins.postcss(postCssPlugins) : pipe());

const rename = () =>
	plugins.rename({
		dirname: '',
		// suffix: !isDev ? '.min' : '',
	});

const output = () => dest(paths.taskTarget(dirs.styles));

const reload = () =>
	browserSync.reload({
		stream: true,
	});

const concat = () =>
	isDev || config.build.bundles.includes('css')
		? plugins.concat(`${mainBundle}.css`)
		: pipe();

const compileStyles = () => {
	const checkFiles = require(paths.core('checkFiles'));
	checkFiles('styles');
	return src(inputs(), { cwd: paths.app(dirs.styles) })
		.pipe(pluginErrorHandle())
		.pipe(sourcemapsInit())
		.pipe(compileSass())
		.pipe(postCss())
		.pipe(rename())
		.pipe(sourcemapsWrite())
		.pipe(output())
		.pipe(reload());
};

compileStyles.displayName = 'compile:styles';
compileStyles.description = `compile styles source(${colors.cyan(
	paths._pages
)}) using sass before autoprefixing and minifying`;
compileStyles.flags = {
	'--development': 'create source maps for styles',
	'--production': `only create minified output in the deployment directory ${colors.cyan(
		paths.taskTarget(dirs.styles)
	)}`,
};

task(compileStyles);
