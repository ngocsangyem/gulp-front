const { task } = require('gulp');
const colors = require('colors');

const { config } = require('../../utils');

const banner = [
	' ',
	'/////////////////////////////////////',
	'// ' + config.author.name,
	'/////////////////////////////////////',
	' ',
].join('\n');

const done = (cb) => {
	console.log(
		colors.rainbow('\nCongratulations!\n'),
		colors.green(banner),
		colors.magenta('\nBuild Finished! Press Ctrl+C to exit.')
	);
	cb();
};

task(done);
