/*
 * @param {Number} seconds
 * @return string
 */

const formatSeconds = (seconds: number) =>
	[seconds / 60 / 60, (seconds / 60) % 60, seconds % 60]
		.join(':')
		.replace(/\b(\d)\b/g, '0$1');

export { formatSeconds };
