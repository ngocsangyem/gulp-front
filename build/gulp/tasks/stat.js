const { task, src } = require('gulp');
const { writeFileSync } = require('fs');

const { paths, plugins, colors } = require('../../utils');
const { store } = require('../../utils/store');

const sizeOpts = {
	showFiles: true,
};

const stat = () => {
	writeFileSync('store.json', JSON.stringify(store));
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
