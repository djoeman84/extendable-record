import { ExtendableRecord, abstract } from  '../../src/index.js';

export class BaseModel extends ExtendableRecord {
  isValid() {
    abstract();
  }
  isComplete() {
    abstract();
  }
}
BaseModel.defaultProperties = {
  isRequired: false,
  name: '',
  id: null
};