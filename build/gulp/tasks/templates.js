const { task, src, dest, lastRun } = require('gulp');
const { resolve } = require('path');

const { parseData, readDeps } = require('../../core');
const {
	paths,
	pluginErrorHandle,
	plugins,
	isDev,
	browserSync,
	colors,
	config,
} = require('../../utils');
const { pipe } = require('../../core');
const { store } = require('../../utils/store');
const pugPluginAlias = require('pug-alias');

const inputs = () => paths.app('**', '*.pug');

const pugOpts = {
	pretty: isDev,
	data: {
		isDev,
		site: parseData(),
	},
	plugins: [pugPluginAlias(config.alias)],
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

const filter = () => plugins.filter((file) => file.path.includes(paths._pages));

const pugAlias = (path) => {
	for (let i = 0; i < Object.keys(config.alias).length; i++) {
		let alias = Object.keys(config.alias)[i];
		if (new RegExp(`^${alias}\/.*$`).test(path)) {
			return path.replace(alias, config.alias[alias]);
		}
	}
	return path;
};

const dependentsConfig = {
	'.pug': {
		parserSteps: [
			/^\s*(?:extends|include)\s+(.+?)\s*$/gm,
			function (str) {
				const absolute = str.match(/^[\\/]+(.+)/);
				if (absolute) {
					str = resolve(paths._app, absolute[1]);
				}
				return [pugAlias(str)];
			},
		],
		prefixes: ['_'],
		postfixes: ['.pug'],
	},
};

const dependents = () => plugins.dependents(dependentsConfig);

const compileTemplates = () =>
	src(inputs(), { cwd: paths._app, since: lastRun('compile:templates') })
		.pipe(pluginErrorHandle())
		.pipe(dependents())
		.pipe(filter())
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
