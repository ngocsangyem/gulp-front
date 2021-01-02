/*
 * @param {String} url
 * @return Object
 * @example
 * getURLParameters('http://url.com/page?name=Adam&surname=Smith'); => {name: 'Adam', surname: 'Smith'}
 * getURLParameters('google.com'); => {}
 */

const getURLParameters = (url: any) =>
	(url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
		(a: any, v: any) => (
			(a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
		),
		{}
	);

export { getURLParameters };
