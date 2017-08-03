# pluck
Helps pluck multiple values out of an object and deposits them into a new object, optionally under a specific key.
Allows chaining and plucking from an array of objects.

## Installation

```
 
npm install object-pluck --save
 
```

## Usage

```javascript
pluck(['keyName1', 'keyName2'], fromObject, 'optionalNamespace').end();
```

`.end()` returns the final object. Failing to end the pluck would be catastrophic.

## Example

```javascript
const pluck = require('object-pluck');
  
const object = {
  a: 1,
  b: 2,
  c: 3,
  nest: {
    d: 4,
    e: 5,
  },
  array: [
    {
      lame: 'sauce',
      proto: 'buff',
    },
    {
      lame: 'dance',
      proto: 'rage',
    }
  ]
};
 
// standard plucking (pretty much just destructing)
pluck(['a', 'c'], object).end(); // { a: 1, c: 3 }
 
// namespacing
pluck(['a', 'b'], object, 'foo').end();
// returns { foo: { a: 1, b: 2 } }
 
// chaining
pluck(['a', 'c'], object, 'foo').pluck(['d', 'e'], object.nest, 'bar').end();
// returns { foo: { a: 1, c: 3 }, bar: { d: 4, e: 5 } }
 
// plucks from an array of objects too (requires a namespace)
pluck(['lame', 'proto'], object.array, 'fromArray').end();
// returns { fromArray: [ { lame: 'sauce', proto: 'buff' }, { lame: 'dance', proto: 'rage' } ] }
```