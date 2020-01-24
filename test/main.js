const chai = require('chai');
const sinon = require('sinon');

const prgrm = require('../bin/main')


const expect = chai.expect

describe('Test Main Programm', () => {
  it('expect to equal 1', function(){
      prgrm.main()
      expect(1).to.equal(1)
  })
})
