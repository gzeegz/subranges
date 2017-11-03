const expect = require('chai').expect;
const calcWindows = require('./calcWindows');

describe('calcWindows()', () => {

  it('should return an array', () => {
    expect(calcWindows([1, 2, 3], 2)).to.be.an('array');
  });

  it('should return an array of length one if window is same size as range', () => {
    expect(calcWindows([1, 2, 3, 4], 4)).to.have.lengthOf(1);
  });

  it('should return an array of length n - k + 1', () => {
    expect(calcWindows([1, 2, 3, 4, 5, 6], 4)).to.have.lengthOf(3);
  });

  it('should return zero if range has length 1', () => {
    expect(calcWindows([1], 1)).to.be.eql([0]);
  });

  it('should return all zeros if window size is 1', () => {
    expect(calcWindows([1, 2, 3], 1)).to.be.eql([0, 0, 0]);
  });

  it('should correctly calculate each window', () => {
    expect(calcWindows([188930, 194123, 201345, 154243, 154243], 3)).to.be.eql([3, 0 , -1]);
    expect(calcWindows([1, 2, 3, 4, 5, 6], 4)).to.be.eql([6, 6, 6]);
    expect(calcWindows([6, 5, 4, 3, 2, 1], 4)).to.be.eql([-6, -6, -6]);
    expect(calcWindows([1, 1, 1, 1, 1, 1], 4)).to.be.eql([0, 0, 0]);
    expect(calcWindows([1, 2, 1, 2, 3, 4, 1, 2, 3, 1], 6)).to.be.eql([6, 4, 6, 5, 2]);
    expect(calcWindows([1, 2, 1, 2, 3, 4, 1, 2, 3, 1], 2)).to.be.eql([1, -1, 1, 1, 1, -1, 1, 1, -1]);
    expect(calcWindows([1, 2, 1, 2, 3, 4, 1, 2, 3, 1], 3)).to.be.eql([0, 0, 3, 3, 0, 0, 3, 0]);
    expect(calcWindows([1, 2, 1, 2, 3, 4, 1, 2, 3, 1], 4)).to.be.eql([1, 2, 6, 2, 1, 2, 2]);
  });

});
