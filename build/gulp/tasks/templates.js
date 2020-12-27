const { task, src, dest } = require('gulp');

const { parseData, readDeps } = require('../../core');
const {
	paths,
	pluginErrorHandle,
	plugins,
	isDev,
	browserSync,
	colors,
} = require('../../utils');
const { pipe } = require('../../core');
const { store } = require('../../utils/store');

const inputs = () => paths.pages('**', '*.pug');

const pugOpts = {
	pretty: isDev,
	data: {
		isDev,
		site: parseData(),
	},
};

const compilePug = () => {
	readDeps();
	return plugins.pug(pugOpts);
};

const parsePug = () => {
	const parsePug = require(paths.core('parsePug'));

	if (!store.pages) {
		store.pages = {};
	}

	return pipe(parsePug, 'parsePug');
};

const parseHTML = () => {
	const parseHTML = require(paths.core('parseHTML'));
	return pipe(parseHTML, 'parseHTML');
};

const output = () => dest(paths._taskTarget);

const rename = () =>
	plugins.rename({
		dirname: '',
	});

const compileTemplates = () =>
	src(inputs(), { cwd: paths._app })
		.pipe(pluginErrorHandle())
		.pipe(parsePug())
		.pipe(compilePug())
		.pipe(parseHTML())
		.pipe(rename())
		.pipe(output())
		.on('end', browserSync.reload);
compileTemplates.displayName = 'compile:templates';
compileTemplates.description = `compile templates source(${colors.cyan(
	paths._pages
)}) using pug`;
compileTemplates.flags = {
	'--production':
		'Turns off pretty option in pug and removes whitespace from output',
};

task(compileTemplates);
