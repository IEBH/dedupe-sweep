module.exports = {
	title: 'Random guess',
	description: 'Test only strategy that is no better than flipping a coin',
	steps: [
		{
			skipOmitted: false,
			fields: ['doi'],
			sort: 'doi',
			comparison: 'random',
		},
	],
};
