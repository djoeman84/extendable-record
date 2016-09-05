[![Version](https://img.shields.io/npm/v/extendable-record.svg)](https://www.npmjs.com/package/extendable-record)
[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/djoeman84/extendable-record/blob/master/LICENSE)
[![dependencies](https://david-dm.org/djoeman84/extendable-record.svg)](https://david-dm.org/djoeman84/extendable-record)
[![devDependency Status](https://david-dm.org/djoeman84/extendable-record/dev-status.svg)](https://david-dm.org/djoeman84/extendable-record#info=devDependencies)
[![airbnb code style](https://img.shields.io/badge/code%20style-airbnb-fd5c63.svg)](https://github.com/airbnb/javascript)

---

## Dependencies
- [ImmutableJS](https://github.com/facebook/immutable-js)

## Getting Started
```shell
npm install extendable-record --save
```

## Usage
```javascript
import { ExtendableRecord } from  'extendable-record';

export class BaseModel extends ExtendableRecord {}
BaseModel.defaultProperties = {
  isRequired: false,
  name: '',
  id: null
};

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

var myModel = PrimitiveModel({value: 2, id: 'myModelId'});

var myNewModel = myModel.setValue(4)

```

## Credits

- [ImmutableJS](https://github.com/facebook/immutable-js) for underlying data structures
- [Hexbridge](http://hexbridge.com) for sponsoring my open-source work.
- [npm-starter](https://github.com/deiucanta/npm-starter)
- [Airbnb](http://airbnb.com) for the work they've put into the javascript style guide and into the ESlint package.

## License

MIT @ [Joe Delgado](https://twitter.com/soy_chupacabra)
