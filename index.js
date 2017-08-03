module.exports = (keysArr, object, namespace) => {

  const output = { data: {} };

  output.end = function() { return Object.assign({}, output.data); };

  output._pluck = function(arr, obj, ns) {
    if (ns && !Object.prototype.hasOwnProperty.call(output.data, ns)) output.data[ns] = {};
    for (let i = 0; i < arr.length; i += 1) {
      if (Object.prototype.hasOwnProperty.call(obj, arr[i])) {
        if (ns) {
          output.data[ns][arr[i]] = obj[arr[i]];
        } else {
          output.data[arr[i]] = obj[arr[i]];
        }
      }
    }
    return this;
  };

  output._simplePluck = function(keys, obj) {
    const o = {};
    for (let i = 0; i < keys.length; i += 1) {
      if (Object.prototype.hasOwnProperty.call(obj, keys[i])) {
        o[keys[i]] = obj[keys[i]];
      }
    }
    return o;
  };

  output.pluck = function(arr, obj, ns) {
    if (Array.isArray(obj)) {
      if (ns) {
        output.data[ns] = obj.map(o => output._simplePluck(arr, o));
        return this;
      }
      throw new Error('Namespace is required if plucking from an array');
    }
    output._pluck.call(this, arr, obj, ns);
    return this;
  };

  output.pluck.call(this, keysArr, object, namespace);

  return output;
};