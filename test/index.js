import _ from 'lodash';
import Dedupe from '../src/index.js';
import { expect } from 'chai';

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


	it('should correctly identify duplicate DOIs and provide stats (#1)', ()=>
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


	it('should correctly identify duplicate DOIs and provide stats (#2)', ()=>
		(new Dedupe())
			.set('strategy', 'doiOnly')
			.set('dupeRef', Dedupe.DUPEREF.RECNUMBER)
			.run([
				{recNumber: 1, doi: 'https://doi.org/10.1000/182'},
				{recNumber: 2, doi: '10.1234/123'},
				{recNumber: 3, doi: '10.1000/182'},
				{recNumber: 4, urls: ['https://doi.org/10.1000/182']},
				{recNumber: 5, urls: ['https://doi.org/10.1234/123']},
			])
			.then(output => expect(output).to.be.deep.equal([
				{recNumber: 1, doi: 'https://doi.org/10.1000/182', dedupe: {score: 0, dupeOf: []}},
				{recNumber: 2, doi: '10.1234/123', dedupe: {score: 0, dupeOf: []}},
				{recNumber: 3, doi: '10.1000/182', dedupe: {score: 1, dupeOf: [1]}},
				{recNumber: 4, urls: ['https://doi.org/10.1000/182'], dedupe: {score: 1, dupeOf: [3]}},
				{recNumber: 5, urls: ['https://doi.org/10.1234/123'], dedupe: {score: 1, dupeOf: [2]}},
			]))
	);

	it('should correctly identify duplicate DOIs and provide stats (missing fields)', ()=>
		(new Dedupe())
			.set('strategy', 'doiOnly')
			.set('dupeRef', Dedupe.DUPEREF.RECNUMBER)
			.run([
				{recNumber: 1, doi: 'https://doi.org/10.1000/182'},
				{recNumber: 2}, // Intentionally omitted DoI data
				{recNumber: 3},
				{recNumber: 4, urls: ['https://doi.org/10.1000/182']},
				{recNumber: 5, doi: 'https://doi.org/10.1000/182'},
			])
			.then(output => expect(output).to.be.deep.equal([
				{recNumber: 1, doi: 'https://doi.org/10.1000/182', dedupe: {score: 0, dupeOf: []}},
				{recNumber: 2, dedupe: {score: 0, dupeOf: []}},
				{recNumber: 3, dedupe: {score: 0, dupeOf: []}},
				{recNumber: 4, urls: ['https://doi.org/10.1000/182'], dedupe: {score: 1, dupeOf: [1]}},
				{recNumber: 5, doi: 'https://doi.org/10.1000/182', dedupe: {score: 1, dupeOf: [4]}},
			]))
	);


	it('should correctly mark duplicate DOIs', ()=>
		(new Dedupe())
			.set('strategy', 'doiOnly')
			.set('action', Dedupe.ACTIONS.MARK)
			.set('markOk', ref => 'OK!')
			.set('markDupe', ref => 'DUPE!')
			.run([
				{doi: 'https://doi.org/10.1000/182'},
				{doi: '10.1000/182'},
			])
			.then(output => expect(output).to.be.deep.equal([
				{doi: 'https://doi.org/10.1000/182', dedupe: 'OK!'},
				{doi: '10.1000/182', dedupe: 'DUPE!'},
			]))
	);


	it('should correctly delete duplicate DOIs', ()=>
		(new Dedupe())
			.set('strategy', 'doiOnly')
			.set('action', Dedupe.ACTIONS.DELETE)
			.run([
				{doi: 'https://doi.org/10.1000/182'},
				{doi: '10.1000/182'},
			])
			.then(output => expect(output).to.be.deep.equal([
				{doi: 'https://doi.org/10.1000/182'},
			]))
	);


	it('should correctly identify duplicate DOIs (randomized DOIs)', ()=> {
		var originals = [
			{doi: 'https://doi.org/10.1000/182'},
			{doi: '10.1000/182'},
			{urls: ['https://doi.org/10.1000/182']},
		];

		var input = _(new Array(100))
			.map(()=> _.sample(originals))
			.shuffle()
			.value();

		return (new Dedupe())
			.set('strategy', 'doiOnly')
			.set('action', Dedupe.ACTIONS.DELETE)
			.on('runMutated', refs => { // Check all refs have been rewritten
				refs.forEach(ref =>
					expect(_.pick(ref, 'doi')).to.have.property('doi', 'https://doi.org/10.1000/182')
				)
			})
			.run(input)
			.then(output => expect(output).to.have.length(1))
	});

});
