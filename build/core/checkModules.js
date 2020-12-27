const { checkFile } = require('./checkFile');
const { isDev } = require('../utils');
const { extname, join, basename } = require('path');
const { isExternal } = require('../helpers');

/**
 * Check a modules from components dependency.
 *
 * @param {String} component
 * @param {String} type
 * @param {Object} page
 * @param {Object} deps
 * @param {Array} extnames
 * @param {Array} imports
 *
 * @return {undefined}
 */

const checkModules = function (component, type, page, deps, extnames, imports) {
	const modules = (deps[component] && deps[component].modules) || [];
	const async = /@(async|defer)/gi;

	modules.forEach((module) => {
		if (!module || module.constructor !== Object) {
			return console.log(`Dependency module must be a object!`);
		}

		const from = module.from;
		const items = Array.isArray(module[type])
			? module[type]
			: [module[type]];
		const filter =
			typeof module.filter === 'function' ? module.filter : false;

		if (type === 'import') {
			items.forEach((item) => {
				if (typeof item !== 'string') {
					return;
				}

				if (isExternal(from)) {
					return;
				}

				item = item.replace(async, '');

				if (!extnames.includes(extname(item))) {
					return;
				}

				const file = join(from, item);

				if (filter && page) {
					let checkFilter = filter(file, page, component, type);
					if (!checkFilter) {
						return;
					}
				}

				if (!checkFile(file, component, item, isDev)) {
					return;
				}

				if (imports.indexOf(file) === -1) {
					imports.push(file);
				}
			});
		}

		if (type === 'inject') {
			const scripts = page.scripts;
			const styles = page.styles;
			const assets = page.assets;

			items.forEach((item) => {
				if (typeof item !== 'string') {
					return;
				}

				const file = isExternal(from)
					? from + item
					: join(from, item).replace(async, '');

				if (filter && page) {
					let checkFilter = filter(file, page, component, type);
					if (!checkFilter) {
						return;
					}
				}

				if (isExternal(from)) {
					const extName = extname(item.replace(async, ''));

					if (extName === '.js' && scripts.indexOf(file) === -1) {
						scripts.push(file);
					}
					if (extName === '.css' && styles.indexOf(file) === -1) {
						styles.push(file);
					}
				} else {
					const name = basename(file);
					const extName = extname(file);

					if (!checkFile(file, component, item, isDev)) {
						return;
					}

					if (extName === '.js' && scripts.indexOf(name) === -1) {
						scripts.push(name);
					}
					if (extName === '.css' && styles.indexOf(name) === -1) {
						styles.push(name);
					}
					if (assets.indexOf(file) === -1) {
						assets.push(file);
					}
				}
			});
		}
	});
};

module.exports = { checkModules };
