const { task } = require('gulp');
const del = require('del');

const { paths, colors, dirs } = require('../../utils');

const clean = () =>
	del([
		paths.root(dirs.temporary),
		paths.root(dirs.destination),
		paths.root('*.zip'),
		paths.root('*.rar'),
	]);
clean.description = `Clean ${colors.cyan(paths._taskTarget)}`;
clean.flags = {
	'--clean': `Clean ${colors.cyan(paths._taskTarget)} directory`,
};

task(clean);
