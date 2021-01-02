// name of root element
const rootComponentName = 'tabbed-component';

// define object storing classnames
const classes = {
	container: rootComponentName,
	buttonList: `${rootComponentName}__list`,
	buttonContainer: `${rootComponentName}__item`,
	buttonActive: `${rootComponentName}__item--active`,
	button: `${rootComponentName}__button`,

	sectionContainer: `${rootComponentName}__container`,
	section: `${rootComponentName}__section`,
	sectionActive: `${rootComponentName}__section--active`,
};

const buttonList = <HTMLElement>document.querySelector(`.${classes.buttonList}`);

// function to accept a nodelist and class, and  loop through the list to remove html class from all nodes
const removeClassFromNodeList = (nodeList: NodeList, className: string) => {
	Array.from(nodeList).forEach((cur) => {
		(<HTMLElement>cur).classList.remove(className);
	});
};

const initScalableButtonedTabs = () => {
	// propagate event listener to button container to prevent x seperate functions to each of the buttons
	buttonList.addEventListener('click', (e) => {
		// if the click event was on one of the buttons (not the container outside)
		const el = (<HTMLElement>e.target).closest(`.${classes.buttonContainer}`);

		// return if something other than the button is clicked
		if (!el) {
			return;
		}

		// store data in data-section="" html attribute
		let id = (<HTMLElement>el).dataset.section;
		const section = <HTMLElement>document.getElementById(`section-${id}`)

		// return if tabbed selection already has the section
		if (section.classList.contains(classes.sectionActive)){
			return;
		}

		// query the DOM to find all buttons and remove active button
		let buttons = document.querySelectorAll(`.${classes.buttonContainer}`);
		removeClassFromNodeList(buttons, classes.buttonActive);

		// add the active class to the new button from event
		el.classList.toggle(classes.buttonActive);

		// store all sections in a node list
		let sections = document.querySelectorAll(`.${classes.section}`);
		removeClassFromNodeList(sections, classes.sectionActive);

		// add active class to section from dataset of button clicked
		section.classList.add(classes.sectionActive);

		console.log(id);
	});
};

export { initScalableButtonedTabs }


