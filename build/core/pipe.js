const through = require('through2');
const PluginError = require('plugin-error');

/**
 * Run `handler` for every file in pipe.
 *
 * @param {Function} handler
 * @param {String} handlerName
 *
 * @return {Object}
 */

const pipe = function (handler, handlerName, options) {
	const name = handlerName || (handler && handler.displayName) || 'core:pipe';
	const opts = options || {};
	if (typeof handler !== 'function') {
		return through.obj();
	}

	return through.obj(function (file, enc, cb) {
		if (file.isStream()) {
			return cb(new PluginError(name, 'Streaming not supported'));
		}

		if (file.isBuffer()) {
			try {
				handler(file, opts);
			} catch (e) {
				return cb(new PluginError(name, e));
			}
		}

		return cb(null, file);
	});
};

module.exports = { pipe };
