const { paths, config } = require('../utils');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const WebpackCommonConfig = {
	target: 'web',

	module: {
		rules: [
			{
				test: /\.(ts)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'esbuild-loader',
				options: {
					loader: 'ts',
					target: 'es2015'
				}
			},
		],
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		alias: config.alias,
		plugins: [new TsconfigPathsPlugin()],
	},
};

module.exports = { WebpackCommonConfig };
