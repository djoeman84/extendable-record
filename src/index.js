import { Collection, Record, Map } from 'immutable';

import { getDetaultPropertiesForInstance } from './util';

const INITIALIZED_TOKEN = '____isInitializedForImmutability:hqQUB1vW4XLV2EmvVZWnnNS5A';

// eslint-disable-next-line import/prefer-default-export
export class ExtendableRecord extends Collection.Keyed {
  constructor(values) {
    super();
    const InstanceClassPrototype = Object.getPrototypeOf(this);
    const isInitialized = Object.prototype.hasOwnProperty.call(
        InstanceClassPrototype, INITIALIZED_TOKEN);
    if (!isInitialized) {
      InstanceClassPrototype[INITIALIZED_TOKEN] = true;
      const defaultValues = getDetaultPropertiesForInstance(this);
      const keys = Object.getOwnPropertyNames(defaultValues);
      keys.forEach((key) => {
        Object.defineProperty(InstanceClassPrototype, key, {
          get() {
            return this.get(key);
          },
          set(value) {
            // eslint-disable-next-line no-underscore-dangle
            if (!this.__ownerID) throw new Error('Cannot set on an immutable record.');
            this.set(key, value);
          },
        });
      });
      InstanceClassPrototype.size = keys.length;
      /* eslint-disable no-underscore-dangle */
      InstanceClassPrototype._name = InstanceClassPrototype.constructor.name;
      InstanceClassPrototype._keys = keys;
      InstanceClassPrototype._defaultValues = defaultValues;
      /* eslint-enable no-underscore-dangle */
    }
    // eslint-disable-next-line no-underscore-dangle, new-cap
    this._map = Map(values);
  }
}

const ExtendableRecordPrototype = ExtendableRecord.prototype;
const MapPrototype = Map.prototype;
const RecordPrototype = Record.prototype;
const DELETE = 'delete';
ExtendableRecordPrototype.toString = RecordPrototype.toString;
ExtendableRecordPrototype.has = RecordPrototype.has;
ExtendableRecordPrototype.get = RecordPrototype.get;
ExtendableRecordPrototype.clear = RecordPrototype.clear;
ExtendableRecordPrototype.set = RecordPrototype.set;
ExtendableRecordPrototype.remove = RecordPrototype.remove;
ExtendableRecordPrototype.wasAltered = RecordPrototype.wasAltered;
/* eslint-disable no-underscore-dangle */
ExtendableRecordPrototype.__iterator = RecordPrototype.__iterator;
ExtendableRecordPrototype.__iterate = RecordPrototype.__iterate;
ExtendableRecordPrototype.__ensureOwner = RecordPrototype.__ensureOwner;
/* eslint-enable no-underscore-dangle */

ExtendableRecordPrototype[DELETE] = ExtendableRecordPrototype.remove;
ExtendableRecordPrototype.deleteIn = undefined;
ExtendableRecordPrototype.removeIn = MapPrototype.removeIn;
ExtendableRecordPrototype.merge = MapPrototype.merge;
ExtendableRecordPrototype.mergeWith = MapPrototype.mergeWith;
ExtendableRecordPrototype.mergeIn = MapPrototype.mergeIn;
ExtendableRecordPrototype.mergeDeep = MapPrototype.mergeDeep;
ExtendableRecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
ExtendableRecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
ExtendableRecordPrototype.setIn = MapPrototype.setIn;
ExtendableRecordPrototype.update = MapPrototype.update;
ExtendableRecordPrototype.updateIn = MapPrototype.updateIn;
ExtendableRecordPrototype.withMutations = MapPrototype.withMutations;
ExtendableRecordPrototype.asMutable = MapPrototype.asMutable;
ExtendableRecordPrototype.asImmutable = MapPrototype.asImmutable;
