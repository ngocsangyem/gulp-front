const { task } = require('gulp');
const {
	browserSync,
	args,
	config,
	taskTarget,
	colors,
	paths,
} = require('../../utils');

const serve = () => {
	return browserSync.init({
		open: args.open ? 'local' : false,
		startPath: config.baseUrl,
		port: config.port || 4000,
		server: {
			baseDir: taskTarget,
			routes: (() => {
				let routes = {};

				// Map base URL to routes
				routes[config.baseUrl] = taskTarget;

				return routes;
			})(),
		},
	});
};
serve.displayName = 'browserSync';
serve.description = `creates a Browsersync instance that serves content from ${colors.cyan(
	paths._taskTarget
)} providing live reload and style injection`;

task(serve);
