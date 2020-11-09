var Dedupe = require('..');
var expect = require('chai').expect;

describe('Mutators', ()=> {

	var dedupe = new Dedupe();

	it.skip('authorRewrite', ()=> {
		expect(dedupe.mutators.authorRewrite.handler('Bill Gates')).to.equal('B. Gates');
		expect(dedupe.mutators.authorRewrite.handler('William Henry Gates')).to.equal('W. Gates');
		expect(dedupe.mutators.authorRewrite.handler('Bill Gates, Steven Anthony Balmer')).to.equal('B. Gates, S. Balmer');
		expect(dedupe.mutators.authorRewrite.handler('B Gates, S Balmer')).to.equal('B. Gates, S. Balmer');
		expect(dedupe.mutators.authorRewrite.handler('Gates B., Balmer S.')).to.equal('B. Gates, S. Balmer');
		expect(dedupe.mutators.authorRewrite.handler('W H Gates, S Balmer')).to.equal('B. Gates, S. Balmer');
		expect(dedupe.mutators.authorRewrite.handler('William Henry Gates III, Steven F. Balmer')).to.equal('W. Gates, S. Balmer');
	});

	it('alphaNumericOnly', ()=> {
		expect(dedupe.mutators.alphaNumericOnly.handler('one$two_three()')).to.equal('one two three ');
	});

	it('numericOnly', ()=> {
		expect(dedupe.mutators.numericOnly.handler('one1two2three3')).to.equal('123');
	});

	it('deburr', ()=> {
		expect(dedupe.mutators.deburr.handler('ÕÑÎÔÑ')).to.equal('ONION');
	});

	it('disguardCase', ()=> {
		expect(dedupe.mutators.disguardCase.handler('Hello World')).to.equal('hello world');
	});

	it('removeEnclosingBrackets', ()=> {
		expect(dedupe.mutators.removeEnclosingBrackets.handler('(One)')).to.equal('One');
	});

});
