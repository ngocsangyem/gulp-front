const { checkModules } = require('./checkModules');
const { paths, isDev } = require('../utils');
const { store } = require('../utils/store');

/**
 * Parse component dependencies.
 *
 * @param {String} component
 * @param {Object} page
 * @param {Object} deps
 *
 * @return {undefined}
 */

const parseDeps = function (component, page, deps) {
	if (!deps[component]) {
		return;
	}

	checkModules(component, 'inject', page, deps);
};

module.exports = parseDeps;
