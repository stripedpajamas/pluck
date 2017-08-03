const assert = require('assert');
const pluck = require('../');

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
      happy: 'maybe',
      onlyHere: 'not elsewhere'
    },
    {
      lame: 'dance',
      proto: 'rage',
      happy: 'not',
    }
  ]
};

// standard plucking (pretty much just destructing)
const test1 = pluck(['a', 'c'], object).end();
assert.deepStrictEqual(test1,
  {
    a: 1,
    c: 3
  }, 'it should pluck keys from an object');

// namespacing
const test2 = pluck(['a', 'b'], object, 'foo').end();
assert.deepStrictEqual(test2,
  {
    foo: {
      a: 1,
      b: 2
    }
  }, 'it should put plucked data under a key if specified');

// chaining
const test3 = pluck(['a', 'c'], object, 'foo').pluck(['d', 'e'], object.nest, 'bar').end();
assert.deepStrictEqual(test3,
  {
    foo: {
      a: 1,
      c: 3
    },
    bar: {
      d: 4,
      e: 5
    }
  }, 'it should allow for chaining');

// from an array of objects
const test4 = pluck(['lame', 'proto'], object.array, 'fromArray').end();
assert.deepStrictEqual(test4,
  {
    fromArray: [
      {
        lame: 'sauce',
        proto: 'buff'
      },
      {
        lame: 'dance',
        proto: 'rage'
      }
    ]
  }, 'it should pluck from an array of objects');

// chaining with normal object and an array of objects
const test5 = pluck(['a', 'b'], object, 'foo').pluck(['happy'], object.array, 'happiness').pluck(['d', 'e'], object.nest, 'nested').end();
assert.deepStrictEqual(test5,
  {
    foo: {
      a: 1,
      b: 2
    },
    happiness: [
      {
        happy: 'maybe'
      },
      {
        happy: 'not'
      }
    ],
    nested: {
      d: 4,
      e: 5
    }
  }, 'it should allow chaining with array plucking and non-array plucking');

// array plucking requires a namespace
assert.throws(pluck.bind(['lame', 'proto'], object.array));

// handles missing keys from objects ok
const test7 = pluck(['x', 'y'], object, 'notReal').end();
assert.deepStrictEqual(test7,
  {
    notReal: {}
  }, 'it should handle keys that don\'t exist');

// handles keys that only exist in one array of objects
const test8 = pluck(['lame', 'onlyHere'], object.array, 'fromArray').end();
assert.deepStrictEqual(test8,
  {
    fromArray: [
      {
        lame: 'sauce',
        onlyHere: 'not elsewhere'
      },
      {
        lame: 'dance',
      }
    ]
  }, 'it should handle keys that only exist in one array of objects');

console.log('All tests passed!');