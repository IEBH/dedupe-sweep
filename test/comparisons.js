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

	it('jaroWinkler', ()=> {
		expect(dedupe.comparisons.jaroWinkler.handler('one', 'one')).to.be.equal(1);
		expect(dedupe.comparisons.jaroWinkler.handler('One', 'one')).to.be.equal(0);
		expect(dedupe.comparisons.jaroWinkler.handler('one', 'on!')).to.be.equal(0.2);
		expect(dedupe.comparisons.jaroWinkler.handler('one', 'two')).to.be.equal(0);
		expect(dedupe.comparisons.jaroWinkler.handler('onetwothree', 'onetXothree')).to.be.equal(0.4);
	});

});
