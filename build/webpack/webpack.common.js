const { paths } = require('../utils');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const WebpackCommonConfig = {
	target: 'web',

	module: {
		rules: [
			{
				test: /\.(ts)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'awesome-typescript-loader',
			},
		],
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		alias: {
			'@': paths._app,
			'@components': paths._components,
			'@pages': paths._pages,
			'@helpers': paths._helpers,
			'@assets': paths._assets,
		},
		plugins: [new TsconfigPathsPlugin()],
	},
};

module.exports = { WebpackCommonConfig };
