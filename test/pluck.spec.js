const assert = require('assert');
const pluck = require('../');

const object = {
  a: 1,
  b: 2,
  c: 3,
  nest: {
    d: 4,
    e: 5,
  }
};

// standard plucking (pretty much just destructing)
const test1 = pluck(['a', 'c'], object).end();
assert.deepStrictEqual(test1, { a:1, c: 3}, 'it should pluck keys from an object');

// namespacing
const test2 = pluck(['a', 'b'], object, 'foo').end();
assert.deepStrictEqual(test2, { foo: { a: 1, b: 2 } }, 'it should put plucked data under a key if specified');

// chaining
const test3 = pluck(['a', 'c'], object, 'foo').pluck(['d', 'e'], object.nest, 'bar').end();
assert.deepStrictEqual(test3, { foo: { a: 1, c: 3 }, bar: { d: 4, e: 5 } }, 'it should allow for chaining');

console.log('All tests passed!');