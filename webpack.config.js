const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
module.exports = {
	//  context: __dirname,
	entry: {
		bundle: './index.js',
	},
	output: {
		// 出力するファイル名
		filename: '[name].js',
		// 出力先のパス
		path: __dirname + '/dist',
		//publicPath: __dirname + "/dest/js",
		publicPath: './',
		globalObject: 'this',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				// exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
							plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]],
						},
					},
				],
			},
		],
	},
	devServer: {
		publicPath: '/',
		contentBase: __dirname + '/',
		watchContentBase: true,
		port: 8087,
	},
	plugins: [
		// new webpack.LoaderOptionsPlugin({
		// 	// test: /\.xxx$/,  may apply this only for some modules
		// 	options: {
		// 		html: './index.html',
		// 	},
		// }),
		new ESLintPlugin({ emitError: false }),
	],
	devtool: 'source-map',
	resolve: {
		extensions: ['.js'],
	},
	target: ['web'],
	optimization: {
		minimize: false,
		portableRecords: true,
		moduleIds: 'deterministic',
	},
	experiments: {
		topLevelAwait: true,
	},
};
