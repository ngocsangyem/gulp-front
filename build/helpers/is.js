const { lstatSync, statSync } = require('fs');
const colors = require('ansi-colors');

/**
 * Check file and directory.
 *
 * @param {String}
 *
 * @return {Boolean}
 */

const isFile = (filePath) => {
	let file = false;
	try {
		file = statSync(filePath);
	} catch (error) {
		// console.log(colors.red(error));
	}

	return file && !file.isDirectory();
};

const isDirectory = (directoryPath) => {
	let stats = false;

	try {
		stats = lstatSync(directoryPath);
	} catch (error) {
		// console.log(c.red(error));
	}

	return stats && stats.isDirectory();
};

const isExternal = (url) => {
	if (typeof url !== 'string') {
		console.log(colors.red(`${url} must be string`));
		return false;
	}
	return (
		/^(?:https?\:)?\/\//i.test(url) ||
		url.indexOf('data:') === 0 ||
		url.charAt(0) === '#'
	);
};

module.exports = { isFile, isDirectory, isExternal };
