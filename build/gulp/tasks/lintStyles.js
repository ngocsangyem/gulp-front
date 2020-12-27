const { task, src } = require('gulp');

const { paths, config, plugins, colors } = require('../../utils');

const inputs = () => paths.app('**', '*.s+(a|c)ss');

const lintStyles = () =>
	src(inputs())
		.pipe(plugins.sassLint(config.lintStyles))
		.pipe(plugins.sassLint.format())
		.pipe(plugins.sassLint.failOnError());
lintStyles.displayName = 'lint:styles';
lintStyles.description = `lint style source(${colors.cyan(
	paths._app
)}) using sasslint`;

task(lintStyles);
