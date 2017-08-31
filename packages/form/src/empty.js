import { NOT_EMPTY } from './codes';
const isEmptyArray = value => Array.isArray(value) && value.length === 0;

export default code => {
  return (key, data) => {
    const value = data[key];

    return {
      isValid:
        value === undefined ||
        value === null ||
        value === '' ||
        isEmptyArray(value),
      code: code || NOT_EMPTY,
    };
  };
};
