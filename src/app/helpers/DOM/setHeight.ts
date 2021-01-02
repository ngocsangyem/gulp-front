const setHeight = (el: HTMLElement, val: string | number | Function) => {
	if (typeof val === 'function') {
		val = val();
	}
	if (typeof val === 'string') {
		el.style.height = val;
	} else {
		el.style.height = val + 'px';
	}
};

export { setHeight };
