const { isExternal } = require('../helpers');
const { paths } = require('../utils');

/**
 * Parse attr value and try to find assets.
 *
 * @param {String} value
 * @param {Object} page
 * @param {Object} paths
 *
 * @return {undefined}
 */

module.exports = function (value, page) {
	const assets = value.split(',');

	assets.forEach((asset) => {
		asset = asset.trim();

		if (!asset || isExternal(asset)) {
			return;
		}

		asset = asset.replace(/ \d{1,2}x$/g, '').trim();

		let file = false;

		asset.replace(/^@([\w-]+)(.*)/i, (str, component, end) => {
			if (
				['styles', 'symbol', 'scripts', 'static', 'favicons'].includes(
					component
				)
			)
				return;
			return (file = paths.app('*', component, 'assets', end));
		});

		if (file && page.assets.indexOf(file) === -1) {
			page.assets.push(file);
		}
	});
};
