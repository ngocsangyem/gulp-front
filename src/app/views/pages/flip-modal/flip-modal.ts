import { FlipModalComponent } from '@/components/modals/flip-modal/flip-modal';

export class FlipModalPageComponent {
	constructor() {
		this.flipModal();
	}

	flipModal() {
		let buttons = document.querySelectorAll<HTMLElement>('.btn__swing');
		buttons.forEach((cur) => new FlipModalComponent(cur));
	}

	static init() {
		const flip_modal = new FlipModalPageComponent();
		return flip_modal;
	}
}
(function () {
	FlipModalPageComponent.init();
})();
