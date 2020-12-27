const { sync } = require('glob');
const { basename, dirname } = require('path');

const { dirs, paths } = require('../utils');
const { isDirectory, isFile, isExternal } = require('../helpers');

const { store } = require('../utils/store');

/**
 * Read dependencies.
 *
 * @return {undefined}
 */

const readDeps = function () {
	const deps = (store.deps = {});
	const isArray = (modules) => Array.isArray(modules);
	const isModule = (module) => module && module.constructor === Object;
	const isFrom = (module) => module.from && typeof module.from === 'string';

	sync(paths.app('**', 'deps.js')).forEach((file) => {
		const component = basename(dirname(file));

		if (!isDirectory(dirname(file))) {
			return;
		}

		if (isFile(file)) {
			delete require.cache[require.resolve(file)];

			const data = require(file);
			const modules = data.modules;

			if (data && isArray(modules)) {
				modules.forEach((module) => {
					if (!isModule(module)) {
						return;
					}

					if (!isFrom(module)) {
						return (module.from = dirname(file) + dirs.assets);
					}

					if (isExternal(module.from)) {
						return;
					}

					return (module.from = paths.root(module.from));
				});
			}

			if (!deps[component] && data) {
				if (data) {
					deps[component] = {
						modules: Array.isArray(modules) ? modules : [],
					};
				}
			} else {
				if (data) {
					deps[component] = {
						modules: Array.isArray(modules)
							? deps[component].modules.concat(modules)
							: deps[component].modules,
					};
				}
			}
		}
	});
};

module.exports = { readDeps };
