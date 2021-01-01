import { SwingModalComponent } from '@components/modals/swing-modal/swing-modal';

export class IndexComponent {
	constructor() {
		this.swingModalDemo();
	}

	swingModalDemo() {
		let buttons = document.querySelectorAll('.btn__swing');
		buttons.forEach((cur) => new SwingModalComponent(cur));
	}

	static init() {
		const index = new IndexComponent();
		return index;
	}
}
(function () {
	IndexComponent.init();
})();
