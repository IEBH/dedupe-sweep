export default {
	title: 'DOI only',
	description: 'Compare references against DOI fields only',
	mutators: {
		doi: 'doiRewrite',
	},
	steps: [
		{
			sort: 'doi',
			fields: ['doi'],
			comparison: 'exact',
		},
	],
};
