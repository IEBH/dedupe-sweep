module.exports = {
	title: 'DOI only',
	description: 'Compare references against DOI fields only',
	mutators: {
		doi: 'doiRewrite',
	},
	steps: [
		{
			fields: ['doi'],
			comparison: 'exact',
		},
	],
};
