export class ButtonsPageComponent {
	constructor() {
		console.log('buttons page component');
	}
	static init() {
		const Buttons = new ButtonsPageComponent();
		return Buttons;
	}
}
(function() {
	ButtonsPageComponent.init()
})();