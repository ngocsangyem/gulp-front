import { animateNumber } from '@/components/counting-number/counting-number';
import { SwingModalComponent } from '@components/modals/swing-modal/swing-modal';
import { initScalableButtonedTabs } from '@components/tabs/scalable-buttoned-tabs/scalable-buttoned-tabs';

export class IndexComponent {
	constructor() {
		this.swingModal();
		this.scalableButtonedTabs();
		this.countingNumber();
	}

	swingModal() {
		let buttons = document.querySelectorAll<HTMLElement>('.btn__swing');
		buttons.forEach((cur) => new SwingModalComponent(cur));
	}

	scalableButtonedTabs() {
		initScalableButtonedTabs();
	}

	countingNumber() {
		const animationClass = 'animate-number';

		document
			.querySelectorAll<HTMLElement>(`.${animationClass}`)
			.forEach(animateNumber);
	}

	static init() {
		const index = new IndexComponent();
		return index;
	}
}
(function () {
	IndexComponent.init();
})();
