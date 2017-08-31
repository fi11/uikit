import { REQUIRED } from './codes';
import empty from './empty';

export default (code) => {
  const emptyValidator = empty();

  return (key: string, data: Object) => {
    if (emptyValidator(key, data).isValid) {
      return { code: code || REQUIRED, isValid: false };
    }

    return { code: code || REQUIRED, isValid: String(data[key]).replace(/\s+/g, '') !== '' };
  };
};