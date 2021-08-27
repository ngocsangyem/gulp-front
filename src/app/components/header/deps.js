module.exports = {
	modules: [
		{
			from: '', // jQuery from CDN
			inject: [], // this file will be used on the page separately
		},
		{
			from: 'node_modules/swiper', // get swiper from node_modules
			inject: [], // this file will be used on the page separately
			import: [], // this file will be imported into the common bundle
		},
	],
};
