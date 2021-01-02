const parents = (el: HTMLElement, parentSelector: HTMLElement | Document) => {
	if (parentSelector === undefined) {
		parentSelector = document;
	}
	var parents = [];
	var p = el.parentNode;
	while (p !== parentSelector) {
		let o = p;
		parents.push(o);
		p = (<HTMLElement>o).parentNode;
	}
	parents.push(parentSelector);
	return parents;
}

export { parents }
