const { basename, extname } = require('path');

const { store } = require('../utils/store');
const { injectAssets } = require('./injectAssets');

/**
 * Inject assets to HTML.
 *
 * @param {Object} file
 *
 * @return {undefined}
 */

const HTMLInject = function (file) {
	const code = String(file.contents);
	const name = basename(file.path, extname(file.path));
	const page = store.pages[name];
	const injected = injectAssets(code, page);

	file.contents = Buffer.from(injected);
};

module.exports = HTMLInject;
