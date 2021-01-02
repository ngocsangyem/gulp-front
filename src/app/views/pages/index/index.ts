import { SwingModalComponent } from '@components/modals/swing-modal/swing-modal';
import { initScalableButtonedTabs } from '@components/tabs/scalable-buttoned-tabs/scalable-buttoned-tabs';

export class IndexComponent {
	constructor() {
		this.swingModalDemo();
		this.scalableButtonedTabs();
	}

	swingModalDemo() {
		let buttons = document.querySelectorAll('.btn__swing');
		buttons.forEach((cur) => new SwingModalComponent(cur));
	}

	scalableButtonedTabs() {
		initScalableButtonedTabs();
	}

	static init() {
		const index = new IndexComponent();
		return index;
	}
}
(function () {
	IndexComponent.init();
})();
