const { join } = require('path');

const { paths, config, isDev, mainBundle, dirs } = require('../utils');
const { isExternal, isFile } = require('../helpers');
const { store } = require('../utils/store');

/**
 * Append styles and scripts and symbol to HTML code.
 *
 * @param {String} code
 * @param {Object} page
 *
 * @return {String}
 */

const injectAssets = function (code, page) {
	const withGap = /(\s+)?(<!--(\s+)?GAP:([\w]+)(\s+)?-->)/gi;
	const comment = /(\s+)?(<!--(\s+)?GFRONT:([\w]+)(\s+)?-->)/gi;
	const pattern = /@(async|defer)/gi;
	const newLine = /(?:\r\n|\r|\n)/g;
	const version =
		!isDev && config.build.addVersions ? `?v=${Date.now()}` : '';
	const favicons = [];
	const arrays = {
		scripts: [],
		styles: [],
	};

	// if (isDev) {
	// 	page.styles.unshift(`${mainBundle}.css`);
	// 	page.scripts.push(`${mainBundle}.js`);
	// } else {
	// 	const bundles = config.build.bundles;
	// 	const style =
	// 		(bundles.includes('css') ? page.name : mainBundle) + '.min.css';
	// 	const script =
	// 		(bundles.includes('js') ? page.name : mainBundle) + '.min.js';

	// 	if (isFile(join(paths._styles, style))) {
	// 		page.styles.unshift(style);
	// 	}
	// 	if (isFile(join(paths._scripts, script))) {
	// 		page.scripts.push(script);
	// 	}
	// }

	const bundles = config.build.bundles;
	const style = (bundles.includes('css') ? page.name : mainBundle) + '.css';
	const script = (bundles.includes('js') ? page.name : mainBundle) + '.js';

	if (isFile(join(paths._styles, style))) {
		page.styles.unshift(style);
	}
	if (isFile(join(paths._scripts, script))) {
		page.scripts.push(script);
	}

	page.scripts.forEach((src) => {
		let script = '<script src="[src]"[attr]></script>';
		let attrs = '';

		if (/@async/gi.test(src)) {
			attrs += ' async';
		}
		if (/@defer/gi.test(src)) {
			attrs += ' defer';
		}

		if (!isExternal(src)) {
			src = `${dirs.HTMLRoot}${dirs.scripts}/${src}`;
		}

		script = script
			.replace(
				'[src]',
				src.replace(pattern, '') + (isExternal(src) ? '' : version)
			)
			.replace('[attr]', attrs);

		if (arrays.scripts.indexOf(script) === -1) {
			arrays.scripts.push(script);
		}
	});

	page.styles.forEach((href) => {
		let style = '<link rel="stylesheet" href="[href]">';

		if (!isExternal(href)) {
			href = `${dirs.HTMLRoot}${dirs.styles}/${href}`;
		}

		style = style.replace(
			'[href]',
			href.replace(pattern, '') + (isExternal(href) ? '' : version)
		);

		if (arrays.styles.indexOf(style) === -1) {
			arrays.styles.push(style);
		}
	});

	if (!isDev) {
		const head = {
			favicon: 'favicon.ico',
			favicon16: 'favicon-16x16.png',
			favicon32: 'favicon-32x32.png',
			manifest: 'manifest.json',
			browserconfig: 'browserconfig.xml',
			apple: 'apple-touch-icon.png',
			pinned: 'safari-pinned-tab.svg',
		};

		if (isFile(join(paths._favicons, head.browserconfig))) {
			favicons.push(
				`<meta name="msapplication-config" content="${dirs.HTMLRoot}${dirs.favicons}/${head.browserconfig}">`
			);
		}

		if (isFile(join(paths._favicons, head.favicon))) {
			favicons.push(
				`<link rel="shortcut icon" href="${dirs.HTMLRoot}${dirs.favicons}/${head.favicon}" type="image/x-icon">`
			);
		}

		if (isFile(join(paths._favicons, head.favicon16))) {
			favicons.push(
				`<link rel="icon" href="${dirs.HTMLRoot}${dirs.favicons}/${head.favicon16}" sizes="16x16" type="image/png">`
			);
		}

		if (isFile(join(paths._favicons, head.favicon32))) {
			favicons.push(
				`<link rel="icon" href="${dirs.HTMLRoot}${dirs.favicons}/${head.favicon32}" sizes="32x32" type="image/png">`
			);
		}

		if (isFile(join(paths._favicons, head.apple))) {
			favicons.push(
				`<link rel="apple-touch-icon" href="${dirs.HTMLRoot}${dirs.favicons}/${head.apple}" sizes="180x180">`
			);
		}

		if (isFile(join(paths._favicons, head.pinned))) {
			favicons.push(
				`<link rel="mask-icon" href="${dirs.HTMLRoot}${dirs.favicons}/${
					head.pinned
				}" color="${
					(config.app && config.app.safariPinnedTab) || '#424b5f'
				}">`
			);
		}

		if (isFile(join(paths._favicons, head.manifest))) {
			favicons.push(
				`<link rel="manifest" href="${dirs.HTMLRoot}${dirs.favicons}/${head.manifest}">`
			);
		}
	}

	let injected = code;

	injected = injected.replace(comment, (str, indent, com, space, name) => {
		if (!indent) {
			indent = '';
		}

		indent = '\n' + indent.replace(newLine, '');
		name = name.trim().toLowerCase();

		let instead = '';

		if (arrays[name] && arrays[name].length > 0) {
			instead = indent + arrays[name].join(indent);
		}

		if (name === 'symbol') {
			instead = indent + (store.svg || com);
		}

		if (name === 'favicons') {
			instead = indent + favicons.join(indent);
		}

		return instead;
	});

	injected = injected.replace(withGap, (str, indent, com, space, name) => {
		if (!indent) {
			indent = '';
		}

		indent = '\n\n\n' + indent.replace(newLine, '');

		return indent + `<!-- ${name.trim()} -->`;
	});

	return injected;
};

module.exports = { injectAssets };
