module.exports = (keysArr, object, namespace) => {
  const output = { data: {} };
  output.end = function() { return output.data; };
  output.pluck = function(arr, obj, ns) {
    if (ns && !Object.prototype.hasOwnProperty.call(output.data, ns)) output.data[ns] = {};
    for (let i = 0; i < arr.length; i += 1) {
      if (ns) {
        output.data[ns][arr[i]] = obj[arr[i]];
      } else {
        output.data[arr[i]] = obj[arr[i]];
      }
    }
    return this;
  };
  output.pluck.call(this, keysArr, object, namespace);
  return output;
};
