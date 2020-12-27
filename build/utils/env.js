const minimist = require('minimist');

// Gather arguments passed to gulp commands
const args = minimist(process.argv.slice(2));

const isDev = args.development;

module.exports = { args, isDev };
