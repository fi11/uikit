import Store from './Store';
import connect from './connect';
import connectToField from './connectToField';
import connectToForm from './connectToForm';

let formID = 0;
const stores = {};

export default class FormState {
  static create({ validator, errorConfig } = {}) {
    return new this({ validator, errorConfig });
  }

  constructor({ validator, errorConfig } = {}) {
    this._storeConfing = { validator, errorConfig };
  }

  getStore(name) {
    const store = stores[name];

    if (!store) {
      throw new Error('FormState error: you must init form');
    }

    return store;
  }

  removeStore(name) {
    stores[name] = null;
  }

  init({ name, validator, errorCodes } = {}) {
    name = name || `form_${++formID}_${+new Date()}`;
    stores[name] = new Store({
      ...this._storeConfing,
      name,
      validator,
      errorCodes,
    });

    return name;
  }

  createFieldContainer(FieldComponent) {
    return connectToField(FieldComponent);
  }

  createFormContainer(FormComponent, config, mapStateToProps) {
    return connectToForm(FormComponent, this, config, mapStateToProps);
  }

  createContainer(Component, mapStateToProps) {
    return connect(Component, mapStateToProps);
  }
}
