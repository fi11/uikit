import { EMAIL_INVALID } from './codes';

const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export default () => {
  return (key, data) => {
    const value = data[key];

    return {
      code: EMAIL_INVALID,
      isValid: re.test(value),
    };
  }
}