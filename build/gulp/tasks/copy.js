const { task, src, dest } = require('gulp');
const { dirs, paths } = require('../../utils');

const copyFonts = () =>
	src(paths.assets(dirs.fonts, '**', '*')).pipe(
		dest(paths.taskTarget(dirs.fonts))
	);
copyFonts.displayName = 'copy:fonts';
copyFonts.description = 'copy global files';

task(copyFonts);
