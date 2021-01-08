const { task, src, dest } = require('gulp');
const { readFileSync } = require('fs');

const { paths, plugins } = require('../../utils');

const SEO = JSON.parse(readFileSync(paths.views('_layouts', 'seo.json')));

const inputs = () => [
	paths.taskTarget('**', '*.html'),
	'!' + paths.taskTarget('**', '404.html'),
	'!' + paths.taskTarget('**', '404.html'),
	'!' + paths.taskTarget('**', '400.html'),
	'!' + paths.taskTarget('**', '500.html'),
	'!' + paths.taskTarget('**', '502.html'),
	'!' + paths.taskTarget('**', '503.html'),
];

const output = () => dest(paths._taskTarget);

const sitemap = () =>
	src(inputs(), {
		read: false,
	})
		.pipe(
			plugins.sitemap({
				siteUrl: SEO.cfg_url,
			})
		)
		.pipe(output());
sitemap.description = 'Create sitemap for deploy';
sitemap.flags = {
	'--sitemap': 'Create sitemap for deploy',
};

task(sitemap);
