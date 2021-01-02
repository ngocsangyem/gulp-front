const animDuration = 1500;
const totalFrames = 100;

const updateEvery = animDuration / totalFrames;
const totalKeyframes = Math.floor(animDuration / updateEvery);

const easeOut = (x: number) => x * (2 - x);

const numberCommaSeparator = (num: number) =>
	num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const animateNumber = (el: HTMLElement) => {
	let keyframe = 0;
	const finalNumber = parseInt(el.innerHTML, 10);

	const counter = setInterval(() => {
		keyframe++;

		let progress = easeOut(keyframe / totalKeyframes);
		let currentNumber = Math.round(finalNumber * progress);

		if (parseInt(el.innerHTML, 10) !== currentNumber) {
			el.innerHTML = numberCommaSeparator(currentNumber);
		}

		if (keyframe === totalKeyframes) {
			clearInterval(counter);
		}
	}, updateEvery);
};

export { animateNumber };
