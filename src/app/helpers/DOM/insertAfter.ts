const insertAfter = (el: HTMLElement, anotherEle: HTMLElement) =>
	anotherEle.insertAdjacentElement('afterend', el);

export { insertAfter };
