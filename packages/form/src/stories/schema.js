import { rules } from '../index';
import customRule from './customRule';

export default {
  foo: [rules.required(), customRule('oops :(', '123')],
};