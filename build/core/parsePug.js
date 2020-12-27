const { readFileSync } = require('fs');
const { basename, extname, dirname, join } = require('path');
const parse = require('pug-parser');
const lexer = require('pug-lexer');
const parseDeps = require('./parseDeps');

const { getAssets } = require('./getAssets');
const { mainBundle } = require('../utils');
const { store } = require('../utils/store');

/**
 * Parse Pug code from the given `file`.
 *
 * @param {Object} file
 *
 * @return {undefined}
 */

const parsePug = function (file) {
	const filename = file.path;
	const pageName = basename(file.path, extname(file.path));
	const src = readFileSync(filename).toString();
	const tokens = lexer(src, { filename });
	const ast = parse(tokens, { filename, src });
	const pages = store.pages;
	const resolve = (filename, source) => {
		filename = filename.trim();
		if (filename[0] !== '/' && !source) {
			throw new Error(
				'the "filename" option is required to use includes and extends with "relative" paths'
			);
		}

		filename = join(
			filename[0] === '/' ? options.basedir : dirname(source.trim()),
			filename
		);

		return filename;
	};
	const page = (pages[pageName] = {
		name: pageName,
		components: {},
		styles: [],
		scripts: [],
		symbol: [],
		assets: [],
	});
	const app = {};
	let components;
	let includes;

	ast.nodes.forEach((node) => {
		if (node.type === 'NamedBlock') {
			includes = [
				...node.nodes.filter(
					(nod) => nod.type === 'RawInclude' || nod.type === 'Include'
				),
			];
		}
	});

	includes.forEach((include) => {
		const name = basename(include.file.path, extname(include.file.path));
		page.components[name] = (page.components[name] || 0) + 1;
	});

	Object.keys(pages).forEach((page) => {
		components = { ...pages[page].components };
	});

	Object.keys(components).forEach((component) => {
		parseDeps(component, page, store.deps);
		getAssets(pages);
		app[component] = (app[component] || 0) + 1;
	});

	pages[mainBundle] = { components: app };
};

module.exports = parsePug;
