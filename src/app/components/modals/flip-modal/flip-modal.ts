export class FlipModalComponent {
	element: Element;
	modalID: string;
	modalNode: HTMLElement;
	modalParent: HTMLElement;
	open: boolean;
	constructor(modalButton: HTMLElement) {
		this.element = modalButton;
		this.modalID = <string>modalButton.dataset.id;
		this.modalNode = <HTMLElement>document.querySelector(`#${this.modalID}`);
		this.modalParent = <HTMLElement>this.modalNode.parentNode;
		this.open = false;

		this.modalInit();
	}

	modalInit = () => {
		this.element.addEventListener('click', this.openModal);
		this.modalParent.addEventListener('mousedown', this.handleOverlayClick);

		let closeButtons = this.modalNode.querySelectorAll('.modal-close');
		closeButtons.forEach((cur) =>
			cur.addEventListener('click', this.closeModal)
		);
	};

	openModal = () => {
		this.modalParent.classList.add('modal-background--active');

		this.modalNode.classList.add('modal--active');

		this.open = !this.open;
	};

	closeModal = () => {
		this.modalParent.classList.remove('modal-background--active');

		this.modalNode.classList.remove('modal--active');

		this.open = !this.open;
	};

	handleOverlayClick = (event: Event) => {
		if (!(<HTMLElement>event.target).closest('.modal')) {
			this.closeModal();
		}
	};
}
