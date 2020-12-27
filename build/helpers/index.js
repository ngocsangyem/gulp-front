const { isFile, isDirectory, isExternal } = require('./is');
const { removeExtension } = require('./removeExtension');
const { toSnakeCase } = require('./toSnakeCase');
const {
	isModifier,
	isElement,
	getComponent,
	isComponent,
	delModifier,
	isBEM,
} = require('./bem');

module.exports = {
	isFile,
	isDirectory,
	isExternal,
	removeExtension,
	toSnakeCase,
	isModifier,
	isElement,
	getComponent,
	isComponent,
	delModifier,
	isBEM,
};
