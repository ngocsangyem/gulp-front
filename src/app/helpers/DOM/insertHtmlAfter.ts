const insertHtmlAfter = (html: string, el: HTMLElement) =>
	el.insertAdjacentHTML('afterend', html);

export { insertHtmlAfter };
