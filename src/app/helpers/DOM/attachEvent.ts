const attachEvent = (className: string, callback: Function) => {
	document.addEventListener("click", event => {
		const target = event.target;
		if ((<HTMLElement>target).classList.contains(className)) {
			callback(event);
		}
	});
};

export { attachEvent };
