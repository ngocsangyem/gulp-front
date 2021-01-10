const colors = require('ansi-colors');
const { resolve, join } = require('path');
const pjson = require('../../package.json');

const { isFile } = require('../helpers');

const {
	dependencyTemplate,
	jsonTemplate,
	sassTemplate,
	scssTemplate,
	componentTemplate,
	testTemplate,
	jsTemplateClass,
	jsPageTemplateClass,
	pageTemplate,
	sassPageTemplate,
	scssPageTemplate,
} = require('../core/templates/templates');

let config = {};
const root = resolve(__dirname, '..', '..');

try {
	const appConfig = resolve(__dirname, '..', '..', 'config.js');
	if (isFile(appConfig)) {
		config = require(appConfig);
	}
} catch (error) {
	console.log(colors.red(error));
} finally {
	const port = 3000;
	config.port = Object.assign(port, config.port);

	const baseUrl = '/';
	config.baseUrl = Object.assign(baseUrl, config.baseUrl);

	const app = {
		name: pjson.name,
		version: pjson.version,
		url: 'demosite.com',
	};
	config.app = Object.assign(app, config.app);

	const directories = {
		HTMLRoot: './',
		source: 'src',
		app: 'app',
		temporary: 'tmp',
		components: 'components',
		styles: 'styles',
		assets: 'assets',
		static: 'static',
		helpers: 'helpers',
		scripts: 'scripts',
		images: 'images',
		fonts: 'fonts',
		data: 'data',
		views: 'views',
		pages: 'pages',
		destination: 'dist',
		favicons: 'favicons',
	};
	config.directories = Object.assign(directories, config.directories);

	const lintStyles = {
		options: {
			configFile: resolve(__dirname, '..', '..', '.sass-lint.yml'),
			formatter: 'checkstyle',
		},
	};
	config.lintStyles = Object.assign(lintStyles, config.lintStyles);

	const author = {
		name: pjson.name,
		version: pjson.version,
		link: '',
		license: 'MIT',
		coding: '',
		phone: '',
		email: '',
	};
	config.author = Object.assign(author, config.author);

	const build = {
		globalStyles: ['app/styles/global.scss', 'app/styles/custom'],
		mixins: 'app/styles/styles.scss',
		templatesExtend: 'app/views/layouts/layout.pug',
		mainComponents: 'components',
		mainBundle: 'app',
		bundles: ['css', 'js'],
		addVersions: true,
	};
	config.build = Object.assign(build, config.build);

	const addContent = {
		data: jsonTemplate,
		test: testTemplate,
		component: {
			pug: componentTemplate,
			ts: jsTemplateClass,
			js: jsTemplateClass,
			sass: sassTemplate,
			scss: scssTemplate,
		},
		page: {
			pug: pageTemplate,
			ts: jsPageTemplateClass,
			js: jsPageTemplateClass,
			sass: sassPageTemplate,
			scss: scssPageTemplate,
		},
	};
	config.addContent = Object.assign(addContent, config.addContent);

	const component = {
		templates: '.pug',
		scripts: '.ts',
		styles: '.scss',
		test: false,
		data: true,
		BEM: false,
	};
	config.component = Object.assign(component, config.component);

	const addComponents = {
		b: ['.pug', '.scss', '.ts'],
	};
	config.addComponents = Object.assign(addComponents, config.addComponents);

	const favicons = {
		android: false,
		appleIcon: false,
		appleStartup: false,
		coast: false,
		favicons: true,
		firefox: false,
		windows: false,
		yandex: false,
	};
	config.favicons = Object.assign(favicons, config.favicons);

	const alias = {
		'@': join(root, config.directories.source, config.directories.app),
		'@components': join(
			root,
			config.directories.source,
			config.directories.app,
			config.directories.components
		),
		'@pages': join(
			root,
			config.directories.source,
			config.directories.app,
			config.directories.views,
			config.directories.pages
		),
		'@helpers': join(
			root,
			config.directories.source,
			config.directories.app,
			config.directories.helpers
		),
		'@assets': join(
			root,
			config.directories.source,
			config.directories.assets
		),
	};
	config.alias = Object.assign(alias, config.alias);
}

module.exports = { config };
