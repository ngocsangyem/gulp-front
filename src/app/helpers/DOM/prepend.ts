const prepend = (target: HTMLElement, el: HTMLElement) =>
	target.insertBefore(el, target.firstChild);

export { prepend };
