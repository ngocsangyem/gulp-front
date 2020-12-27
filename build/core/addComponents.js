const { mkdirSync, writeFileSync } = require('fs');
const { join, relative, extname, dirname, basename, sep } = require('path');
const colors = require('colors');

const { isDirectory, isFile, getComponent } = require('../helpers');
const { replaceName } = require('../helpers/replace-name');
const { paths, config } = require('../utils');

const addComponents = {
	sep: Array(16).join('-'),
	message: '',

	setType(argv) {
		this.type = argv[2] === 'page' ? argv[2] : 'component';
	},

	setItems(argv) {
		let items = argv.slice(this.type === 'page' ? 3 : 2);

		this.items = items.filter((el, i) => items.indexOf(el) === i);
	},

	setCustomPath() {
		let path;

		this.items.some((el) => {
			if (el[0] === ':') {
				return (path = el);
			}
			return false;
		});

		if (path) {
			this.items = this.items.slice(0, this.items.indexOf(path));
			path = path.slice(1);
		} else {
			path = config.build.mainComponents;
		}

		this.path = path;
	},

	setOptions() {
		let option;

		this.items.some((el) => {
			if (el[0] === ':') {
				return (option = el);
			}

			return false;
		});

		if (option) {
			this.items = this.items.slice(0, this.items.indexOf(option));
			option = option.slice(1);
		}

		this.options = {
			customPath: option === 'customPath' || false,
			noTemplate: option === 'noTemplate' || false,
			test: option === 'test' || false,
			data: option === 'data' || false,
		};
	},

	checkDirs() {
		try {
			const app = paths._app;
			const pages = paths._pages;
			const components = paths._components;
			const path = join(app, this.path);

			if (!isDirectory(app)) {
				mkdirSync(app);
			}
			if (!isDirectory(pages)) {
				mkdirSync(pages);
			}
			if (!isDirectory(components)) {
				mkdirSync(components);
			}
			if (!isDirectory(path)) {
				mkdirSync(path);
			}
		} catch (error) {
			console.log(colors.brightRed(`Create main folder fail: ${error}`));
		}
	},

	addMessage(str) {
		if (typeof str !== 'string') {
			console.log(colors.brightRed('Content must be string'));
			return;
		}

		const newLine = this.message === '' ? '' : '\n';
		this.message += newLine + str;
	},

	addDirectory(dir) {
		const where = relative(paths._src, dir);

		if (isDirectory(dir)) {
			return this.addMessage(
				`\x1b[41mFAIL\x1b[0m: Directory "\x1b[36m${where}\x1b[0m" already exist!`
			);
		}

		mkdirSync(dir, { recursive: true });

		this.addMessage(
			`\x1b[42mGOOD\x1b[0m: Directory "\x1b[36m${where}\x1b[0m" successfully created!`
		);
	},

	addFile(file, content) {
		const where = relative(paths._src, file);
		const what = this.type === 'page' ? 'Page' : 'File';
		const extName = extname(file).slice(1);

		if (isFile(file)) {
			return this.addMessage(
				`\x1b[41mFAIL\x1b[0m: ${what} "\x1b[36m${where}\x1b[0m" already exist!`
			);
		}

		if (this.type === 'page') {
			if (extName === 'scss' || extName === 'sass') {
				writeFileSync(
					file,
					this.options.noTemplate
						? ''
						: this.addStyles(file, config.build.globalStyles) +
								content,
					'utf8'
				);
			} else if (extName === 'pug') {
				writeFileSync(
					file,
					this.options.noTemplate
						? ''
						: this.addLayout(file, config.build.templatesExtend) +
								content,
					'utf8'
				);
			} else {
				writeFileSync(file, content, 'utf8');
			}
		} else {
			if (extName === 'scss' || extName === 'sass') {
				writeFileSync(
					file,
					this.options.noTemplate
						? ''
						: this.addStyles(file, config.build.mixins) + content,
					'utf8'
				);
			} else {
				writeFileSync(file, content, 'utf8');
			}
		}

		this.addMessage(
			`\x1b[42mGOOD\x1b[0m: ${what} "\x1b[36m${where}\x1b[0m" successfully created!`
		);
	},

	addStyles(file, option) {
		const extName = extname(file);
		const imports = option;

		if (extName === '.css') {
			console.log(
				`\n\x1b[41mFAIL\x1b[0m: Only use for CSS preprocessors"\n`
			);
			return;
		}

		const dirName = dirname(file);
		const array = Array.isArray(imports) ? imports : [imports];
		let injected = '';

		array.forEach((item) => {
			if (typeof item !== 'string') {
				return;
			}

			item = item.trim();

			if (!item) {
				return;
			}

			const file = paths.src(item);

			if (extName === '.sass') {
				injected += `@import "${paths.slashNormalize(
					relative(dirName, file)
				)}";\n`;
			} else {
				injected += `@import "${paths.slashNormalize(
					relative(dirName, file)
				)}";\n`;
			}
		});

		return injected;
	},

	addLayout(file, option) {
		const extName = extname(file);
		const imports = option;

		if (extName === '.css') {
			console.log(`\n\x1b[41mFAIL\x1b[0m: Only use for Pug"\n`);
			return;
		}

		const dirName = dirname(file);
		const array = Array.isArray(imports) ? imports : [imports];
		let injected = '';

		array.forEach((item) => {
			if (typeof item !== 'string') {
				return;
			}

			item = item.trim();

			if (!item) {
				return;
			}

			const file = paths.src(item);

			injected += `extends ${paths.slashNormalize(
				relative(dirName, file)
			)}\n`;
		});

		return injected;
	},

	addPage(name) {
		const extName = extname(name) || config.component.templates;
		const baseName = basename(name, extName);
		const file = paths.pages(baseName + extName);
		const content = replaceName(
			(config.addContent && config.addContent.page) || '',
			baseName
		);

		return this.addFile(file, content);
	},

	addComponents(node, extensions, type) {
		const component = this.options.customPath ? node : getComponent(node);
		const directory = this.setDirection(component, type);
		let customName = this.parseCustomName(component);
		let dataFile;
		let dataDir;
		let dataContent;

		this.addDirectory(directory);

		extensions = Array.isArray(extensions) ? extensions : [extensions];

		extensions.forEach((extension) => {
			if (
				!extension ||
				!extension.trim() ||
				typeof extension !== 'string'
			) {
				console.log(
					colors.brightRed(
						'Need extension to generate component \n Ex: header[.js,.sass,.pug]'
					)
				);
				return;
			}

			extension = extension.trim().toLowerCase();
			const isFile = extension[0] === '.' || extname(extension);

			if (!isFile) {
				let prev = directory;

				return extension.split(sep).forEach((dir) => {
					if (!dir || !dir.trim() || typeof dir !== 'string') {
						return;
					}

					const where = join(prev, dir);

					this.addDirectory(where);

					prev = where;
				});
			}

			let extName = extname(extension) || extension;
			let ext = extName.slice(1);
			let name = basename(extension, extName) || node;
			let content;
			let file;

			if (type === 'page') {
				content = this.replacePrefix(
					config.addContent.page[ext],
					this.parseNameFromPath(name)
				);
			} else if (type === 'component') {
				content = this.replacePrefix(
					config.addContent.component[ext],
					this.parseNameFromPath(name)
				);
			}

			if (extension !== '.test.js' && extension !== '.json') {
				file = !this.options.customPath
					? join(directory, name + extName)
					: join(directory, customName + extName);
				this.addFile(file, content);
			} else {
				if (extension === '.test.js') {
					this.createTest(
						component,
						type,
						dataDir,
						node,
						dataContent,
						dataFile
					);
				}
				if (extension === '.json') {
					this.createDataJson(
						component,
						type,
						dataDir,
						node,
						dataContent,
						dataFile
					);
				}
			}
		});

		if (
			(config.component.test || this.options.test) &&
			!extensions.includes('.test.js')
		) {
			this.createTest(
				component,
				type,
				dataDir,
				node,
				dataContent,
				dataFile,
				customName
			);
		}

		if (
			(config.component.data || this.options.data) &&
			!extensions.includes('.json')
		) {
			this.createDataJson(
				component,
				type,
				dataDir,
				node,
				dataContent,
				dataFile,
				customName
			);
		}
	},

	createDataJson(
		component,
		type,
		dataDir,
		node,
		dataContent,
		dataFile,
		customName
	) {
		dataDir = this.setDirection(join(component, 'data'), type);
		dataContent = this.replacePrefix(
			config.addContent['data'],
			this.parseNameFromPath(node)
		);
		dataFile = !this.options.customPath
			? join(dataDir, node + '.json')
			: join(dataDir, customName + '.json');
		this.addDirectory(dataDir);
		this.addFile(dataFile, dataContent);
	},

	createTest(
		component,
		type,
		dataDir,
		node,
		dataContent,
		dataFile,
		customName
	) {
		dataDir = this.setDirection(join(component, '__test__'), type);
		dataContent = this.replacePrefix(
			config.addContent['test'],
			this.parseNameFromPath(node)
		);

		dataFile = !this.options.customPath
			? join(dataDir, node + '.test.js')
			: join(dataDir, customName + '.test.js');
		this.addDirectory(dataDir);
		this.addFile(dataFile, dataContent);
	},

	setDirection(direction, type) {
		if (type === 'component' && !this.options.customPath) {
			return paths.app(this.path, direction);
		} else if (type === 'page' && !this.options.customPath) {
			return paths.pages(direction);
		} else if (this.options.customPath) {
			return paths.app(direction);
		}
	},

	parseCustomName(path) {
		if (path.match(/\//g)) {
			const paths = path.split(/\//g);

			return paths[paths.length - 1];
		}
		return path;
	},

	parseNameFromPath(name) {
		if (name.match(/\//g)) {
			const names = name.split(/\//g);
			return names.slice(names.length - 2, names.length).join('');
		}
		return name;
	},

	replacePrefix(condition, name) {
		return replaceName((config.addContent && condition) || '', name);
	},

	parseArguments(argv, showMessage = true) {
		this.setType(argv);
		this.setItems(argv);
		this.setOptions();
		this.setCustomPath();
		this.checkDirs();

		if (this.items.length === 0) {
			this.status = false;
			this.message = `\x1b[41mFAIL\x1b[0m: You must write a \x1b[36m${this.type}\x1b[0m name!`;
		} else {
			this.items.forEach((item) => {
				let name = item.split('[')[0];
				let more = (item.split('[')[1] || '').replace(']', '');
				let extra = more.split(',');

				name = name.trim().toLowerCase();
				if (config.addComponents && config.addComponents[more]) {
					extra = config.addComponents[more];
				}

				return this.addComponents(name, extra, this.type);
			});
		}

		if (this.message && showMessage) {
			console.log(colors.brightGreen(this.message));
		}
	},
};

module.exports = { addComponents };
