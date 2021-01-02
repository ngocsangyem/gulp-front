import { EasingFunctions } from './easing';
import { scrollToTarget } from './scrollToTarget';


const smoothScrollClick = function (e: Event) {
	// Prevent the default action
	e.preventDefault();

	// Get the `href` attribute
	const href = (<HTMLElement>e.target).getAttribute('href');
	const id = (<string>href).substr(1);
	const target = <HTMLElement>document.getElementById(id);

	scrollToTarget(target, 500, EasingFunctions.linear);
};

export { smoothScrollClick };
