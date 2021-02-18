module.exports = {
	title: 'Forbes Automated Deduplication Sweep',
	description: 'Deduplication Sweep with Low Rate of False Positives',
	mutators: {
		authors: 'authorRewriteSingle',
		doi: 'doiRewrite',
		title: ['deburr', 'alphaNumericOnly', 'noCase', 'noSpace'],
		journal: 'noCase',
		year: 'numericOnly',
		pages: 'consistentPageNumbering'
	},
	steps: [
		// TODO: Doi does not seem to be working for now
		// {
		// 	fields: ['doi'],
		// 	sort: 'doi',
		// 	comparison: 'exact',
		// },
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
			fields: ['pages', 'authors'],
			sort: 'pages',
			comparison: 'exact',
		},
		{
			fields: ['pages', 'title'],
			sort: 'pages',
			comparison: 'exact',
		},
		{
			fields: ['pages', 'journal', 'volume'],
			sort: 'pages',
			comparison: 'exact',
		},
	],
};
