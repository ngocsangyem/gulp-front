const { extname, basename, dirname, resolve } = require('path');
const { sync } = require('glob');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const { paths } = require('../paths');

const getEntries = () => {
	const files = {};
	sync(paths.pages('**', '*.+(ts|js)'))
		.filter(function (file) {
			return /\.(js|ts)$/i.test(file);
		})
		.map(function (file) {
			files[basename(dirname(file))] = `./${file}`;
		});

	return files;
};

const TemplatePlugins = () => {
	return sync(paths.pages('**', '*.pug'))
		.filter(function (file) {
			return /\.(pug)$/i.test(file);
		})
		.map((file) => {
			const extension = extname(file);
			const name = basename(file, extension);

			return new HTMLWebpackPlugin({
				filename: `../${name}.html`,
				template: resolve(
					__dirname,
					paths.pages(name, `${name}${extension}`)
				),
				chunks: [name],
				inject: 'body',
			});
		});
};

module.exports = { getEntries, TemplatePlugins };
