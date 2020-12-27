const { sync } = require('glob');
const { basename, dirname } = require('path');
const { readFileSync } = require('fs');

const { paths } = require('../utils/paths');
const {
	toSnakeCase,
	removeExtension,
	isDirectory,
	isFile,
} = require('../helpers');

/**
 * Parse data for template
 *
 * @return {undefined}
 */

const parseData = function () {
	const data = {};

	sync(paths.app('**', '*.json')).forEach((file) => {
		const filename = toSnakeCase(removeExtension(basename(file)));

		if (!isDirectory(dirname(file))) {
			return;
		}

		if (isFile(file)) {
			try {
				const json = JSON.parse(readFileSync(file));
				if (!data[filename]) {
					data[filename] = json;
				} else {
					data[filename] = Object.assign(data[filename], json);
				}
			} catch (error) {
				throw new Error(
					`\n\n\x1b[41mFAIL\x1b[0m: A JSON "\x1b[36m${basename(
						file
					)}\x1b[0m" have SyntaxError:\n${error.message}\n\n`
				);
			}
		}
	});

	return data;
};

module.exports = { parseData };
