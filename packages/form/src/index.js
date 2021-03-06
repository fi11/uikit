export { default as Store } from './Store';
import * as CODES from './codes';
import * as errorStrategies from './errorStrategies';
import createFormContainer from './createFormContainer';
import createFieldContainer from './createFieldContainer';
import createContainer from './createContainer';

import Form from './Form';
import Field from './Field';
import WithFormState from './WithFormState';

import empty from './empty';
import required from './required';

export const rules = {
  empty,
  required,
};

export const codes = CODES;

export const connectForm = (...args) => c => createFormContainer(c, ...args);
export const connectField = (...args) => c => createFieldContainer(c, ...args);
export const connect = (...args) => c => createContainer(c, ...args);

export {
  createFormContainer,
  createFieldContainer,
  createContainer,
  errorStrategies,
  Form,
  Field,
  WithFormState,
};
