var Dedupe = require('..');
var expect = require('chai').expect;

describe('Comparisons', ()=> {

	var dedupe = new Dedupe();

	it('exact', ()=> {
		expect(dedupe.comparisons.exact.handler('one', 'one')).to.be.equal(1);
		expect(dedupe.comparisons.exact.handler('One', 'one')).to.be.equal(0);
		expect(dedupe.comparisons.exact.handler('one', 'on!')).to.be.equal(0);
		expect(dedupe.comparisons.exact.handler(' ne', 'one')).to.be.equal(0);
	});

	it('exactTruncate', ()=> {
		expect(dedupe.comparisons.exactTruncate.handler('one', 'one')).to.be.equal(1);
		expect(dedupe.comparisons.exactTruncate.handler('oneTwo', 'one')).to.be.equal(1);
		expect(dedupe.comparisons.exactTruncate.handler('abcde', 'ab')).to.be.equal(1);
		expect(dedupe.comparisons.exactTruncate.handler('oneTwoThree', 'oneTwoFour')).to.be.equal(0);
	});

	it('jaroWinkler', ()=> {
		expect(dedupe.comparisons.jaroWinkler.handler('one', 'one')).to.be.equal(1);
		expect(dedupe.comparisons.jaroWinkler.handler('One', 'one')).to.be.equal(0.7777777777777777);
		expect(dedupe.comparisons.jaroWinkler.handler('one', 'on!')).to.be.equal(0.8222222222222222);
		expect(dedupe.comparisons.jaroWinkler.handler('one', 'two')).to.be.equal(0);
		expect(dedupe.comparisons.jaroWinkler.handler('onetwothree', 'onetXothree')).to.be.equal(0.9636363636363636);
	});

});
