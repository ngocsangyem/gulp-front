const insertHtmlBefore = (html: string, el: HTMLElement) =>
	el.insertAdjacentHTML('beforebegin', html);

export { insertHtmlBefore };
