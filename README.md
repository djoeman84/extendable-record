[![Version](https://img.shields.io/npm/v/extendable-record.svg)](https://www.npmjs.com/package/extendable-record)
[![Build Status](https://travis-ci.org/djoeman84/extendable-record.svg?branch=master)](https://travis-ci.org/djoeman84/extendable-record)
[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/djoeman84/extendable-record/blob/master/LICENSE)
[![dependencies](https://david-dm.org/djoeman84/extendable-record.svg)](https://david-dm.org/djoeman84/extendable-record)
[![devDependency Status](https://david-dm.org/djoeman84/extendable-record/dev-status.svg)](https://david-dm.org/djoeman84/extendable-record#info=devDependencies)
[![airbnb code style](https://img.shields.io/badge/code%20style-airbnb-fd5c63.svg)](https://github.com/airbnb/javascript)

---
Extends [ImmutableJS Records](http://facebook.github.io/immutable-js/docs/#/Record) enabling class inheritance

## Dependencies
- [ImmutableJS](https://github.com/facebook/immutable-js)

## Getting Started
```shell
npm install extendable-record --save
```

## Usage
```javascript
import { ExtendableRecord } from  'extendable-record';

class BaseModel extends ExtendableRecord {
  isComplete() {
    return true;
  }
  isValid() {
    return true;
  }
}

// default properties describe the set of properties which can be
// set/read. Properties are exposed via getters, so you can use the syntax
// var model = new BaseModel();
// console.log(model.value);
BaseModel.defaultProperties = {
  value: null
};

class TextModel extends BaseModel {
  get length() {
    return this.value.length;
  }
  isComplete() {
    return this.value.length !== 0;
  }
  isValid() {
    return typeof this.value === 'string';
  }
  toLower() {
    return this.set('value', this.value.toLocaleLowerCase());
  }
}

// default properties extend and overwrite the properties of
// the parent. Here, TextModel instances will always default to '',
// but we do have the option of adding extra properties
TextModel.defaultProperties = {
  value: ''
};

class EmailModel extends TextModel {
  isValid() {
    return super.isValid() && /^[^@]+@[^\.]+\.(?:com|edu|biz)$/.test(this.value);
  }
}

class NumberModel extends BaseModel {
  isValid() {
    return typeof this.value === "number";
  }
  add(val) {
    return this.set('value', this.value + val);
  }
  toString() {
    return this.units ? `${this.value} ${this.units}` : this.value;
  }
}

NumberModel.defaultProperties = {
  value: 0,
  units: null
};



const bobsEmail = new EmailModel({value: 'bob@gmail.com'});
console.log(bobsEmail.isValid()); // true
console.log(bobsEmail.set('value', 'bobATgmailDOTcom').isValid()); // false
console.log(bobsEmail.isValid()); // true -- bobsEmail has not been mutated

const myBank = new NumberModel({units: 'dollars'});
console.log(myBank.toString()); // 0 dollars
const myBankAfterDreamOfWinningLotto = myBank.add(100000000);
console.log(myBankAfterDreamOfWinningLotto.toString()); // 100000000 dollars
console.log(myBank.toString()); // 0 dollars -- myBank was not mutated :(

```

## Credits

- [ImmutableJS](https://github.com/facebook/immutable-js) for underlying data structures
- [npm-starter](https://github.com/deiucanta/npm-starter)
- [Airbnb](http://airbnb.com) for the work they've put into the javascript style guide and into the ESlint package.

## License

MIT @ [Joe Delgado](https://twitter.com/soy_chupacabra)
