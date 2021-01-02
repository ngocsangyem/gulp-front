/*
 * @param {String} url
 * @param {String} param
 * @return string
 * @example
 * getParam('http://domain.com?message=hello', 'message'); => 'hello'
 */

const getParam = (url: string, param: string) =>
	new URLSearchParams(new URL(url).search).get(param);

export { getParam };
