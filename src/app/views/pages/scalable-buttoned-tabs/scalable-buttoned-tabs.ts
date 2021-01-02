import { initScalableButtonedTabs } from '@components/tabs/scalable-buttoned-tabs/scalable-buttoned-tabs';

export class ScalableButtonedTabsPageComponent {
	constructor() {
		this.scalableButtonedTabs();
	}

	scalableButtonedTabs() {
		initScalableButtonedTabs();
	}

	static init() {
		const scalable_buttoned_tabs = new ScalableButtonedTabsPageComponent();
		return scalable_buttoned_tabs;
	}
}
(function () {
	ScalableButtonedTabsPageComponent.init();
})();
