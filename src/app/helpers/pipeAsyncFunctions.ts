/*
 * @return ...
 * @desc
 * Performs left-to-right function composition for asynchronous functions.
 * Use Array.prototype.reduce() with the spread operator (...) to perform left-to-right function composition using Promise.then(). The functions can return a combination of: simple values, Promise's, or they can be defined as async ones returning through await. All functions must be unary.
 */

const pipeAsyncFunctions = (...fns: any) => (arg: any) =>
	fns.reduce((p: any, f: any) => p.then(f), Promise.resolve(arg));

// const sum = pipeAsyncFunctions(
// 	(x) => x + 1,
// 	(x) => new Promise((resolve) => setTimeout(() => resolve(x + 2), 1000)),
// 	(x) => x + 3,
// 	async (x) => (await x) + 4
// );
// (async () => {
// 	console.log(await sum(5)); // 15 (after one second)
// })();

export { pipeAsyncFunctions };
