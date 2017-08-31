import { DUPLICATE } from './codes';

export default (compareKey, code) => {
  return (key, data) => {
    const value = data[key];
    const compareValue = data[compareKey];

    return {
      isValid: value === compareValue,
      code: code || DUPLICATE,
    };
  }
}