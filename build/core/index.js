const { parseData } = require('./parseData');
const { pipe } = require('./pipe');
const { readDeps } = require('./readDeps');
const { parsePug } = require('./parsePug');

module.exports = { parseData, pipe, readDeps, parsePug };
