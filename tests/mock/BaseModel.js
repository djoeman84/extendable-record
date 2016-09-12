import { ExtendableRecord } from '../../src/index.js';
import { abstract } from './util';

export class BaseModel extends ExtendableRecord {

}

BaseModel.prototype.isValid = abstract;
BaseModel.prototype.isComplete = abstract;

BaseModel.defaultProperties = {
  isRequired: false,
  name: '',
  id: null,
};
