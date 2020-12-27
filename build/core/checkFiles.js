const { getComponent, isComponent } = require('../helpers');
const { checkModules } = require('./checkModules');
const { store } = require('../utils/store');
const { config, isDev, mainBundle } = require('../utils');

/**
 * Check a files
 *
 * @param {String} type
 *
 * @return {undefined}
 */

const checkFiles = function (type) {
	const { deps } = store;

	const imports = (store[type] = {});
	const needBundles = config.build.bundles.includes(
		type === 'scripts' ? 'js' : 'css'
	);
	const pages =
		!isDev && needBundles ? Object.keys(store.pages) : [mainBundle];
	const importExtnames = {
		styles: ['.css', config.component.styles],
		scripts: ['.js', config.component.scripts],
	};

	pages.forEach((page) => {
		if (!page) {
			return;
		}
		const components = store.pages[page].components;
		const array = (imports[page] = []);

		Object.keys(components).forEach((component) => {
			if (isComponent(component) && deps[component]) {
				checkModules(
					component,
					'import',
					store.pages && store.pages[page],
					deps,
					importExtnames[type],
					array
				);
			}
		});
	});
};

module.exports = checkFiles;
