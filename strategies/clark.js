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
			comparison: 'exact',
		},
		{
			fields: ['author', 'year', 'title', 'volume', 'issue', 'type'],
			comparison: 'exact',
		},
		{
			fields: ['title'],
			comparison: 'exact',
		},
		{
			fields: ['author', 'year'],
			comparison: 'exact',
		},
	],
};
