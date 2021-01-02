/*
 * @param {String} el
 * @param {Function} callback
 * @return null
 * @desc
 * Detect click out side the element
 */

const clickOutside = (el: HTMLElement, callback: Function) => {
	document.addEventListener('click', function (event) {
		const isClickedOutside = !el.contains((<HTMLElement>event.target));
		if (isClickedOutside) {
			callback();
		}
	});
};

export { clickOutside };
