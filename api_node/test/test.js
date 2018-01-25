

const expect = require('chai').expect;
const initMesssage = require('../app/services/get').initMessage;
const checkUtilities = require('../app/utilities/check');


describe('Simple test', () => {
    it('should be true', () => expect(true).to.be.true);
});

describe('test init message', () => {
    it('should be an object', () => expect(initMesssage() ).to.be.an('Object'));
});

// describe('test check properties String', (body) => {
//     it('should be string', () => expect(checkProperties () ).to.be.an('String'));
// });

describe('test check properties number', () => {
    let mocks = {
        name:'toto',
        description:'tâche 1',
        priority:10
    };

    it('should be true', () => {expect(checkUtilities.checkProperties(mocks)).to.be.true})
    it('should be false', () => {
        mocks.name = 85
        expect(checkUtilities.checkProperties(mocks)).to.be.false
    });
});

