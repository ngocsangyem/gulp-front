const setWidth = (el: HTMLElement, val: string | number | Function) => {
	if (typeof val === 'function') {
		val = val();
	}
	if (typeof val === 'string') {
		el.style.width = val;
	} else {
		el.style.width = val + 'px';
	}
};

export { setWidth };
