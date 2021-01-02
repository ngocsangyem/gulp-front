import { SwingModalComponent } from '@components/modals/swing-modal/swing-modal';

export class SwingModalPageComponent {
	constructor() {
		this.swingModal();
	}

	swingModal() {
		let buttons = document.querySelectorAll<HTMLElement>('.btn__swing');
		buttons.forEach((cur) => new SwingModalComponent(cur));
	}

	static init() {
		const swing_modal = new SwingModalPageComponent();
		return swing_modal;
	}
}
(function () {
	SwingModalPageComponent.init();
})();
