const { merge } = require('webpack-merge');

const { WebpackCommonConfig } = require('./webpack.common');

const WebpackDevConfig = merge(WebpackCommonConfig, {
	mode: 'development',

	devtool: 'inline-source-map',
});

module.exports = { WebpackDevConfig };
