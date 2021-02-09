module.exports = {
	title: 'IEBH Deduplication Sweep',
	description: 'IEBH recommended deduplication four step sweep method',
	mutators: {
		author: 'authorRewrite',
		doi: 'doiRewrite',
		title: ['deburr', 'alphaNumericOnly', 'noCase'],
		year: 'numericOnly',
	},
	steps: [
		{
			fields: ['doi'],
			sort: 'doi',
			comparison: 'exact',
		},
		{
			fields: ['title', 'volume'],
			sort: 'title',
			comparison: 'exact',
		},
		{
			fields: ['title', 'year'],
			sort: 'title',
			comparison: 'exact',
		},
		{
			fields: ['isbn', 'volume', 'pages'],
			sort: 'isbn',
			comparison: 'exact'
		}
	],
};
