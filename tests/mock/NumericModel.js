import { ExtendableRecord } from '../../src/index.js';

import { PrimitiveModel } from './PrimitiveModel';

export class NumericModel extends PrimitiveModel {
  isPlural() {
    return this.value !== 1;
  }
  isSingular() {
    return !this.isPlural();
  }
  toString() {
    let str = '';
    if (this.units !== null) {
      const unitString = this.isPlural() ? this.units.plural : this.units.singular;
      str = `${this.value} ${unitString}`;
    } else {
      str = this.value;
    }
    return str;
  }
}

NumericModel.defaultProperties = {
  units: null,
};

export class Unit extends ExtendableRecord {
  constructor(singular, plural) {
    super({ singular, plural });
  }
}

Unit.defaultProperties = {
  singular: 'unit',
  plural: 'units',
};
