import { Collection, Record, Map } from  'immutable';

export class ExtendableRecord extends Collection.Keyed {
  constructor(values) {
    super();
    const defaultValues = this.__getDefaultValues();
    const InstanceClassPrototype = Object.getPrototypeOf(this);
    if (!InstanceClassPrototype.__isInitializedForImmutability) {
      InstanceClassPrototype.__isInitializedForImmutability = true;
      const keys = Object.keys(defaultValues);
      keys.map(k => Object.defineProperty(InstanceClassPrototype, k, {
        get() {
          return this.get(k);
        },
        set(value) {
          if (!this.__ownerID) throw new Error('Cannot set on an immutable record.');
          this.set(k, value);
        }
      }));
      InstanceClassPrototype.size = keys.length;
      InstanceClassPrototype._name = ''; // TODO
      InstanceClassPrototype._keys = keys;
      InstanceClassPrototype._defaultValues = defaultValues;
    }
    this._map = Map(values);
  }

  __getDefaultValues() {
    let constructors = [];
    for (let o = this; o != null; o = Object.getPrototypeOf(o)) {
      constructors.push(o.constructor);
    }
    return constructors.reverse().reduce((prev, cnst) => Object.assign(prev, cnst.defaultProperties), {});
  }
}

export function abstract() {
  throw new Error('Abstract Method, must be overridden');
}

export function assert(condition, msg) {
  if (condition) throw new Error(msg)
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
ExtendableRecordPrototype.__iterator = RecordPrototype.__iterator;
ExtendableRecordPrototype.__iterate = RecordPrototype.__iterate;
ExtendableRecordPrototype.__ensureOwner = RecordPrototype.__ensureOwner;

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
