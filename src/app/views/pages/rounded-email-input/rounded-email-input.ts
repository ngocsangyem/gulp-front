export class RoundedEmailInputPageComponent {
	constructor() {
		console.log('rounded-email-input page component');
	}
	static init() {
		const RoundedEmailInput = new RoundedEmailInputPageComponent();
		return RoundedEmailInput;
	}
}
(function() {
	RoundedEmailInputPageComponent.init()
})();