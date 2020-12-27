const { task, src, dest } = require('gulp');
const { join, relative, basename, extname, sep } = require('path');

const { config, paths, pluginErrorHandle, dirs } = require('../../utils');
const { store } = require('../../utils/store');

const inputs = () => {
	const files = store.assets || [];
	const all = paths.app('**', dirs.assets, '**', '*');

	if (!files.includes(all)) {
		files.push(all);
	}

	return files;
};

const outputJs = (file, basename) => {
	file.path = join(file.base, basename);
	return paths.taskTarget(dirs.scripts);
};

const outputCss = (file, basename) => {
	file.path = join(file.base, basename);
	return paths.taskTarget(dirs.styles);
};

const outputAssets = (file) => {
	let array = relative(paths._app, file.path)
		.split(sep)
		.slice(1)
		.filter((f) => f !== dirs.assets);
	let asset = [array[0]].concat(array.slice(1)).join(sep);
	file.path = join(file.base, asset);

	return paths._static;
};

const output = () =>
	dest((file) => {
		const name = basename(file.path);
		const ext = extname(name);

		if (ext === '.js') {
			return outputJs(file, name);
		} else if (ext === '.css') {
			return outputCss(file, name);
		} else {
			return outputAssets(file);
		}
	});

const assets = () => src(inputs()).pipe(pluginErrorHandle()).pipe(output());
assets.description = 'parse component output';

task(assets);
