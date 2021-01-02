const insertBefore = (el: HTMLElement, anotherEle: HTMLElement) =>
	anotherEle.insertAdjacentElement('beforebegin', el);

export { insertBefore };
