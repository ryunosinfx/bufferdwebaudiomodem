module.exports = {
	plugins: [[require('@babel/plugin-proposal-class-properties'), { loose: false }]],
	presets: [
		'@babel/preset-env',
		{
			targets: {
				esmodules: true,
			},
		},
	],
};
