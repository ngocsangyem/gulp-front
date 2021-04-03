const { task, src, dest, lastRun } = require('gulp');

const Fiber = require('fibers');
const cssDeclarationSorter = require('css-declaration-sorter');
const autoprefixer = require('autoprefixer');
const sortMedia = require('postcss-sort-media-queries');
const cssnano = require('cssnano');
const aliasImporter = require('node-sass-alias-importer');

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

const inputs = () => [paths.app('**', '*.s+(a|c)ss')];

const sourcemapsInit = () =>
	isDev ? plugins.sourcemaps.init({ largeFile: true }) : pipe();

const sassAlias = () =>
	aliasImporter({
		'@': './src/app',
		'@styles': './src/app/styles',
		'@components': './src/app/components',
	});

const sassOpts = {
	fiber: Fiber,
	outputStyle: 'expanded',
	precision: 10,
	importer: [sassAlias()],
};

const compileSass = () => plugins.sass(sassOpts);

const sourcemapsWrite = () => (isDev ? plugins.sourcemaps.write() : pipe());

const postCss = () => (!isDev ? plugins.postcss(postCssPlugins) : pipe());

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

const filter = () => plugins.filter((file) => file.path.includes(paths._pages));

const dependents = () => plugins.dependents();

const dependentsConfig = {
	'.scss': {
		// The sequence of RegExps and/or functions to use when parsing
		// dependency paths from a source file. Each RegExp must have the
		// 'gm' modifier and at least one capture group. Each function must
		// accept a string and return an array of captured strings. The
		// strings captured by each RegExp or function will be passed
		// to the next, thus iteratively reducing the file content to an
		// array of dependency file paths.
		parserSteps: [
			// Please note:
			// The parser steps shown here are only meant to illustrate
			// the concept of a matching pipeline. The actual config used
			// for scss files is pure RegExp and reliably supports the
			// full syntax for import statements.

			// Match the import statements and capture the text
			// between "@import" and ";".
			/^\s*@import\s+(.+?);/gm,

			// Split the captured text on "," to get each path.
			function (text) {
				return text.split(',');
			},

			// Match the balanced quotes and capture only the file path.
			/"([^"]+)"|'([^']+)'/gm,
		],

		// The file name prefixes to try when looking for dependency
		// files, if the syntax does not require them to be specified in
		// dependency statements. This could be e.g. '_', which is often
		// used as a naming convention for mixin files.
		prefixes: ['_'],

		// The file name postfixes to try when looking for dependency
		// files, if the syntax does not require them to be specified in
		// dependency statements. This could be e.g. file name extensions.
		postfixes: ['.sass', '.scss'],

		// The additional base paths to try when looking for dependency
		// files referenced using relative paths.
		basePaths: [],
	},
};

const compileStyles = () => {
	const checkFiles = require(paths.core('checkFiles'));
	checkFiles('styles');
	return src(inputs(), {
		cwd: paths.app(dirs.styles),
		since: lastRun('compile:styles'),
	})
		.pipe(pluginErrorHandle())
		.pipe(
			dependents(dependentsConfig, {
				logDependents: true,
				logDependencyMap: false,
			})
		)
		.pipe(filter())
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
