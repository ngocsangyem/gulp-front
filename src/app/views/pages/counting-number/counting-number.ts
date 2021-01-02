import { animateNumber } from '@/components/counting-number/counting-number';

export class CountingNumberPageComponent {
	constructor() {
		this.countingNumber();
	}

	countingNumber() {
		const animationClass = 'animate-number';

		document
			.querySelectorAll<HTMLElement>(`.${animationClass}`)
			.forEach(animateNumber);
	}

	static init() {
		const counting_number = new CountingNumberPageComponent();
		return counting_number;
	}
}
(function () {
	CountingNumberPageComponent.init();
})();
