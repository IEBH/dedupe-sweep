module.exports = {
	title: 'IEBH Deduplication Sweep',
	description: 'IEBH recommended deduplication four step sweep method',
	mutators: {
		author: 'authorRewrite',
		doi: 'doiRewrite',
		title: ['deburr', 'alphaNumericOnly', 'disguardCase'],
		year: 'numericOnly',
	},
	steps: [
		{
			fields: ['doi'],
			sort: 'doi',
			comparison: 'exact',
		},
		{
			fields: ['author', 'year', 'title', 'volume', 'issue', 'type'],
			sort: 'title',
			comparison: 'exact',
		},
		{
			fields: ['title'],
			sort: 'title',
			comparison: 'exact',
		},
		{
			fields: ['author', 'year'],
			sort: 'title',
			comparison: 'exact',
		},
	],
};
