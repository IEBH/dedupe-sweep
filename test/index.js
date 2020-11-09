var _ = require('lodash');
var Dedupe = require('..');
var expect = require('chai').expect;

describe('Basic dedupe functionality', ()=> {

	it('should correctly mutate an input array to correct DOIs', done =>
		void(new Dedupe())
			.set('strategy', 'doiOnly')
			.on('runMutated', refs => {
				expect(refs.map(r => _.pick(r, 'doi'))).to.be.deep.equal([
					{doi: 'https://doi.org/10.1000/182'},
					{doi: 'https://doi.org/10.1000/182'},
				]);
				done();
			})
			.run([
				{doi: 'https://doi.org/10.1000/182'},
				{doi: '10.1000/182'},
			])
	);


	it('should correctly identify duplicate DOIs', ()=>
		(new Dedupe())
			.set('strategy', 'doiOnly')
			.run([
				{doi: 'https://doi.org/10.1000/182'},
				{doi: '10.1000/182'},
			])
			.then(output => expect(output).to.be.deep.equal([
				{doi: 'https://doi.org/10.1000/182', dedupe: {score: 0, dupeOf: []}},
				{doi: '10.1000/182', dedupe: {score: 1, dupeOf: [0]}},
			]))
	);

	it.only('should correctly identify duplicate DOIs (n+ matches)', ()=>
		(new Dedupe())
			.set('strategy', 'doiOnly')
			.run([
				{doi: 'https://doi.org/10.1000/182'},
				{doi: '10.1000/182'},
				{doi: 'https://doi.org/10.1000/182'},
				{doi: '10.1000/182'},
			])
			.then(output => {
				console.log('OUTPUT', require('util').inspect(output, {depth: null, colors: true}))
				console.log('---');
				return;
				expect(output).to.be.deep.equal([
					{doi: 'https://doi.org/10.1000/182', dedupe: {score: 0, dupeOf: []}},
					{doi: '10.1000/182', dedupe: {score: 1, dupeOf: [0]}},
				])
			})
	);

});
