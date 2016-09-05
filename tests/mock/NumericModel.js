import { ExtendableRecord, abstract } from  '../../src/index.js';

import { PrimitiveModel } from  './PrimitiveModel';

export class NumericModel extends PrimitiveModel {
  isPlural() {
    return this.value !== 1;
  }
  isSingular() {
    return !this.isPlural();
  }
  toString() {
    if (this.units !== null) {
      const unitString = this.isPlural() ? this.units.plural : this.units.singular;
      return `${this.value} ${unitString}`;
    } else {
      return this.value;
    }
  }
}

NumericModel.defaultProperties = {
  units: null
};

export class Unit extends ExtendableRecord{
  constructor(singular, plural) {
    super({singular: singular, plural: plural});
  }
}

Unit.defaultProperties = {
  singular: 'unit',
  plural: 'units'
};