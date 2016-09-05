import { BaseModel } from './BaseModel';

export class PrimitiveModel extends BaseModel {
  getValue() {
    return this.value;
  }
  setVaule(newValue) {
    return this.set('value', newValue);
  }
}
PrimitiveModel.defaultProperties = {
  value: null
};