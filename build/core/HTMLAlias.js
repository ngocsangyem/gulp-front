const { dirs } = require('../utils');

/**
 * replace HTML alias
 *
 * @param {String} code
 *
 * @return {String}
 */

const HTMLAlias = function (html) {
	let injected = html;

	injected = injected.replace(
		/(,|'|"|`| )@([\w-]+)/gi,
		(str, quote, component) => {
			const pathsDist = {
				styles: dirs.styles,
				scripts: dirs.scripts,
				static: dirs.static,
				images: dirs.images,
				favicons: dirs.favicons,
			};

			const dist =
				pathsDist[component] || `${pathsDist.static}/${component}`;

			return `${quote}${dirs.HTMLRoot}${dist}`;
		}
	);

	return injected;
};

module.exports = { HTMLAlias };
