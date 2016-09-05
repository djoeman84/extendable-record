import { expect } from 'chai';
import { NumericModel, Unit } from './mock/NumericModel';
const { describe, it } = global;

describe('ExtendableRecord', () => {

  it('is equal when not mutated', () => {

    var myRecord = new NumericModel({value: 5});

    expect(myRecord).to.equal(myRecord.set('value', 5));
    expect(myRecord).to.equal(myRecord.setVaule(5));

  });

  it('is not equal when mutated', () => {

    var myRecord = new NumericModel({value: 5});

    expect(myRecord).to.not.equal(myRecord.set('value', 3));
    expect(myRecord).to.not.equal(myRecord.setVaule(3));

  });

  it('allows read on defaulted values', () => {

    var myRecord = new NumericModel();

    expect(myRecord.value).to.equal(null);
    expect(myRecord.units).to.equal(null);
    expect(myRecord.isRequired).to.equal(false);
    expect(myRecord.name).to.equal('');
    expect(myRecord.id).to.equal(null);

  });

  it('throws error on write to non-defaulted values', () => {

    var myRecord = new NumericModel();
    expect(() => myRecord.set('nonPresentKey')).to.throw(Error);

  });

  it('allows use of class methods', () => {

    var mile = new Unit('mile', 'miles');
    var myRecord = new NumericModel({value: 5, units: mile});

    expect(myRecord.toString()).to.equal('5 miles');
    expect(myRecord.setVaule(1).toString()).to.equal('1 mile');
    expect(myRecord.setVaule(0.2).toString()).to.equal('0.2 miles');

  });

  it('allows use of inherited methods', () => {

    var myRecord = new NumericModel({value: 5});

    expect(myRecord.getValue()).to.equal(5);
    expect(myRecord.setVaule(1).getValue()).to.equal(1);
    expect(myRecord.setVaule(0.2).getValue()).to.equal(0.2);

  });

});
