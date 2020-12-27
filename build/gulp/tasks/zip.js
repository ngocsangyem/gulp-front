const { task, dest } = require('gulp');

const { paths, plugins, config, colors } = require('../../utils');

const inputs = () => paths.taskTarget('**', '*.*');

const output = () => dest(paths._root);

const zipOpts = {
	filename: config.app.name,
};

const zip = () => src(inputs()).pipe(plugins.zip(zipOpts)).pipe(output());
zip.description = `Zip ${colors.cyan(paths._taskTarget)}`;
zip.flags = {
	'--zip': `Zip ${colors.cyan(paths._taskTarget)} directory`,
};

task(zip);
