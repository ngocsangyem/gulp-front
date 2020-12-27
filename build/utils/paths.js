const { resolve, join } = require('path');
const { config } = require('./config');
const { isDev } = require('./env');

const build = resolve(__dirname, '..');
const root = resolve(__dirname, '..', '..');
const dirs = config.directories;
const taskTarget = isDev ? dirs.temporary : dirs.destination;

const paths = {
	slashNormalize(str) {
		const isExtendedLengthPath = /^\\\\\?\\/.test(str);
		const hasNonAscii = /[^\u0000-\u0080]+/.test(str); // eslint-disable-line no-control-regex

		if (isExtendedLengthPath || hasNonAscii) {
			return str;
		}

		return str.replace(/\\/g, '/');
	},

	root() {
		return join(this._root, ...arguments);
	},

	tasks() {
		return join(this._tasks, ...arguments);
	},

	webpack() {
		return join(this._webpack, ...arguments);
	},

	core() {
		return join(this._core, ...arguments);
	},

	taskTarget() {
		return join(this._taskTarget, ...arguments);
	},

	src() {
		return join(this._src, ...arguments);
	},

	app() {
		return join(this._app, ...arguments);
	},

	components() {
		return join(this._components, ...arguments);
	},

	components() {
		return join(this._data, ...arguments);
	},

	helpers() {
		return join(this._helpers, ...arguments);
	},

	views() {
		return join(this._views, ...arguments);
	},

	pages() {
		return join(this._pages, ...arguments);
	},

	styles() {
		return join(this._styles, ...arguments);
	},

	assets() {
		return join(this._assets, ...arguments);
	},

	static() {
		return join(this._static, ...arguments);
	},

	_root: root,
	_tasks: join(build, 'gulp', 'tasks'),
	_webpack: join(build, 'webpack'),
	_core: join(build, 'core'),
	_taskTarget: join(root, taskTarget),
	_src: join(root, dirs.source),
	_static: join(root, taskTarget, dirs.static),
	_app: join(root, dirs.source, dirs.app),
	_components: join(root, dirs.source, dirs.app, dirs.components),
	_data: join(root, dirs.source, dirs.app, dirs.data),
	_helpers: join(root, dirs.source, dirs.app, dirs.helpers),
	_views: join(root, dirs.source, dirs.app, dirs.views),
	_pages: join(root, dirs.source, dirs.app, dirs.views, dirs.pages),
	_styles: join(root, taskTarget, dirs.styles),
	_scripts: join(root, taskTarget, dirs.scripts),
	_favicons: join(root, taskTarget, dirs.favicons),
	_assets: join(root, dirs.source, dirs.assets),
};

module.exports = { paths, dirs, taskTarget };
