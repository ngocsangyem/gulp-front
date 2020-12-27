const { task, src, dest } = require('gulp');

const { paths, pluginErrorHandle } = require('../../utils');
const { pipe } = require('../../core');

const inputs = () => paths.taskTarget('*.html');

const injectPlugin = () => {
	const HTMLInject = require(paths.core('HTMLInject'));
	return pipe(HTMLInject, 'HTMLInject');
};

const output = () => dest(paths._taskTarget);

const inject = () =>
	src(inputs()).pipe(pluginErrorHandle()).pipe(injectPlugin()).pipe(output());
inject.description = 'inject and change alias assets';

task(inject);
