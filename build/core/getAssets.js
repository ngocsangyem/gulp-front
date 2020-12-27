const { mainBundle } = require('../utils');
const { store } = require('../utils/store');

/**
 * get assets from page
 *
 * @param {Object} pages
 *
 * @return {undefined}
 */

const getAssets = function (pages) {
	const assets = (store.assets = []);

	Object.keys(pages).forEach((page) => {
		if (page !== mainBundle) {
			pages[page].assets.forEach((asset) => {
				if (assets.indexOf(asset) === -1) {
					assets.push(asset);
				}
			});
		}
	});
};

module.exports = { getAssets };
