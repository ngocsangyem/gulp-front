const { normalize } = require('path');
const { obj } = require('through2');
const DependencyParser = require('./dependency-parser');
const DependencyTracker = require('./dependency-tracker');

// The static dependency tracker instance.
let dependencyTracker;

/**
 * Creates a new instance of the plugin.
 * @param parserConfig The parser configuration use, null, undefined or empty string to use the default configuration, or an instance of a custom IDependencyParser.
 * @param pluginConfig The debug configuration use, or null or undefined to disable all debug options.
 */
const plugin = (parserConfig, pluginConfig) => {
	// Get or create the debug options.
	if (!pluginConfig) {
		pluginConfig = {};
	}

	// Get or create the dependency parser and tracker.
	if (dependencyTracker == null) {
		dependencyTracker = new DependencyTracker(
			new DependencyParser(parserConfig)
		);
	}

	// Return the stream transform.
	return obj(
		function (file, encoding, callback) {
			// Get the files that depend on the current file.
			let dependentFiles = dependencyTracker.updateAndGetDependents(
				file,
				encoding
			);

			// Should we log the dependents to the console?
			if (dependentFiles != null && pluginConfig.logDependents) {
				dependencyTracker.logDependents(
					normalize(file.path),
					true,
					process.cwd()
				);
			}

			// Push the current file to the stream.
			this.push(file);

			// If the current file is tracked, add its dependents to the stream.
			if (dependentFiles != null) {
				for (let dependentFile of dependentFiles) {
					this.push(dependentFile);
				}
			}

			callback();
		},
		function (callback) {
			// Should we log the dependency map to the console?
			if (pluginConfig.logDependencyMap) {
				dependencyTracker.logDependencyMap(process.cwd());
			}

			callback();
		}
	);
};

module.exports = plugin;
