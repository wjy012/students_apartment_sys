export const flattenObj = () => {
  let res = {};
  return function flatten(obj) {
    for (let key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        flatten(obj[key]);
      } else {
        res[key] = obj[key];
      }
    }
    return res;
  };
};
