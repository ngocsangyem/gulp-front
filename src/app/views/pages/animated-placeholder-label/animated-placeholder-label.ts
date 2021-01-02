export class AnimatedPlaceholderLabelPageComponent {
	constructor() {
		console.log('animated-placeholder-label page component');
	}
	static init() {
		const AnimatedPlaceholderLabel = new AnimatedPlaceholderLabelPageComponent();
		return AnimatedPlaceholderLabel;
	}
}
(function() {
	AnimatedPlaceholderLabelPageComponent.init()
})();