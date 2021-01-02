// https://htmldom.dev/scroll-to-an-element-smoothly/
const scrollToTarget = function (
	target: HTMLElement,
	duration = 500,
	easing: Function
) {
	const top = target.getBoundingClientRect().top;
	const startPos = window.pageYOffset;
	const diff = top;

	let startTime: number = 0;
	let requestId: any;

	const loop = function (currentTime: number) {
		if (!startTime) {
			startTime = currentTime;
		}

		// Elapsed time in milliseconds
		const time = currentTime - startTime;

		const percent = Math.min(time / duration, 1);
		// use EasingFunctions to animate
		window.scrollTo(0, startPos + diff * percent * easing(percent));

		if (time < duration) {
			// Continue moving
			requestId = window.requestAnimationFrame(loop);
		} else {
			window.cancelAnimationFrame(requestId);
		}
	};
	requestId = window.requestAnimationFrame(loop);
};

export { scrollToTarget };
