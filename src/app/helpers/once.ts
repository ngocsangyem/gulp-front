// Ensures a function is called only once.

const once = (fn: Function) => {
	let called = false;
	return function (...args: any) {
		if (called) return;
		called = true;
		return fn.apply(this, args);
	};
};

export { once };
