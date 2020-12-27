const { merge } = require('webpack-merge');

const { WebpackCommonConfig } = require('./webpack.common');

const WebpackProdConfig = merge(WebpackCommonConfig, {
	mode: 'production',
	devtool: false,

	// output: {
	// 	path: taskTarget,
	// 	publicPath: '/',
	// 	filename: 'js/[name].min.js',
	// },

	optimization: {
		minimize: true,
	},
});

module.exports = { WebpackProdConfig };
