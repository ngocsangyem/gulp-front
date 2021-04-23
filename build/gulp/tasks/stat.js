const { task, src } = require('gulp');

const { paths, plugins, colors } = require('../../utils');

const sizeOpts = {
	showFiles: true,
};

const stat = () => {
	return src(paths.taskTarget('**', '*.*')).pipe(plugins.size(sizeOpts));
};
stat.description = `show sizing statistics for output files in current output directory, default being ${colors.cyan(
	paths._taskTarget
)}`;
stat.flags = {
	'--stat': `show dist file sizes in the ${colors.cyan(
		paths._taskTarget
	)} directory`,
};

task(stat);
