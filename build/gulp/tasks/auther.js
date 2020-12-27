const { task, src, dest } = require('gulp');

const { config, paths, plugins } = require('../../utils');

const banner = [
	'/*',
	' ////////////////////////////////////////////////////////',
	' // <%= auth.name %>',
	' // @version v<%= auth.version %>',
	' // @link <%= auth.link %>',
	' // @license <%= auth.license %>',
	' // @<%= auth.coding %> - <%= auth.phone %>',
	' // @<%= auth.email %>',
	' ////////////////////////////////////////////////////////',
	'*/',
].join('\n');

const header = () =>
	plugins.header(banner, {
		auth: config.author,
	});

const inputs = () => paths.taskTarget('**', '*.{css,js}');

const output = () => dest(paths._taskTarget);

const author = () => src(inputs).pipe(header()).pipe(output());
author.description = 'add a header to style and script files';
author.flags = {
	'--author': 'add a header to style and script files',
};

task(author);
