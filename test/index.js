var Dedupe = require('..');
var expect = require('chai').expect;

describe('Basic dedupe functionality', ()=> {

	it('should correctly mutate an input array to correct DOIs', done =>
		void(new Dedupe())
			.set('strategy', 'doiOnly')
			.on('runMutated', refs => {
				expect(refs).to.be.deep.equal([
					{doi: 'https://doi.org/10.1000/182'},
					{doi: 'https://doi.org/10.1000/182'},
				]);
				done();
			})
			.run(
				[
					{doi: 'https://doi.org/10.1000/182'},
					{doi: '10.1000/182'},
				]
			)
	);

});
