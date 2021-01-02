/*
 * @param {Function} fn
 * @return null
 */

const ready = (fn: any) => {
	if (document.readyState != 'loading') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
};

export { ready };
