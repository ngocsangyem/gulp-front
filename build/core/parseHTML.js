const htmlparser = require('htmlparser2');
const { HTMLAlias } = require('./HTMLAlias');

const { isDev } = require('../utils');

/**
 * Parse HTML code from the given `file`.
 *
 * @param {Object} file
 *
 * @return {undefined}
 */

const parseHTML = function (file) {
	const code = String(file.contents);

	const parse = new htmlparser.Parser(
		{
			onend() {
				const injected = HTMLAlias(code);

				file.contents = Buffer.from(injected);
			},
		},
		{ decodeEntities: true }
	);

	parse.write(code);
	parse.end();
};

module.exports = parseHTML;
