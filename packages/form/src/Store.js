import Dispatcher from '@uikit/dispatcher';
import BitmapState from '@uikit/utils/lib/BitmapState';
import StateStruct from '@uikit/utils/lib/StateStruct';

import * as STATUSES from './fieldStatuses';
import * as STRATEGIES from './errorStrategies';

const DEFAULT_ERROR_STRATEGY = STRATEGIES.ON_TOUCH_AND_SUBMIT;

const bitmapState = new BitmapState([
  STATUSES.SUBMITTED_STATUS,
  STATUSES.SUBMITTING_STATUS,
  STATUSES.TOUCHED_STATUS,
  STATUSES.BLURRED_STATUS,
]);

export default class Store {
  constructor(
    { validator, errorStrategy = DEFAULT_ERROR_STRATEGY, errorCodes = {} } = {},
  ) {
    this._dispatcher = new Dispatcher();
    this._values = {};
    this._initValues = {};
    this._validator = validator;
    this._isValid = true;
    this._errorStrategy = errorStrategy;
    this._errorCodes = errorCodes;

    this._isSubmitting = false;
    this._isDisabled = false;

    this.validate();
  }

  initField(name, value = null, isSilent = false) {
    this._values[name] = this._values[name] || StateStruct.createEmpty();
    this._initValues[name] =
      this._initValues[name] || StateStruct.createEmpty();

    if (value) {
      if (this._values[name].isEmpty()) {
        this._values[name] = this._values[name].setValue(value);
        this.addStatus(name, STATUSES.TOUCHED_STATUS);
        this.addStatus(name, STATUSES.BLURRED_STATUS);
      }

      this._initValues[name] = this._initValues[name].setValue(value);
    }

    this.validate();

    if (!isSilent) {
      this._dispatcher.dispatch('initField');
    }
  }

  validate() {
    const errors = this._validator
      ? this._validator.execute(this.getValues())
      : null;

    Object.keys(this._values).forEach(key => {
      const fieldErrors = errors && errors[key];
      const firstFieldError = (fieldErrors || [])[0];

      if (firstFieldError) {
        this._values[key] = this._values[key].setError(firstFieldError);
      } else {
        this._values[key] = this._values[key].removeError();
      }
    });

    this._errors = { ...errors };
    this._isValid = !errors;

    return this._isValid;
  }

  setValues(values) {
    Object.keys(values).forEach(key => {
      let prevValue = this._values[key];

      if (!prevValue) {
        prevValue = StateStruct.createEmpty();
      }

      this._values[key] = prevValue
        .setStatus(bitmapState.encode(STATUSES.TOUCHED_STATUS))
        .setValue(values[key]);
    });

    this.validate();

    this._dispatcher.dispatch('setValues');
  }

  showFieldError(name, errorText) {
    if (this._values[name]) {
      this._values[name] = this._values[name].setError(errorText);
      this.addStatus(name, STATUSES.TOUCHED_STATUS);
      this.addStatus(name, STATUSES.BLURRED_STATUS);
    }

    this._dispatcher.dispatch('setFieldError');
  }

  removeStatus(name, status) {
    const prevStatus = this._values[name].getStatus();

    if (bitmapState.has(prevStatus, status)) {
      this._values[name] = this._values[name].setStatus(
        bitmapState.remove(prevStatus, status),
      );
    }
  }

  addStatus(name, status, isNeedDispatch = false) {
    if (this._values[name].hasStatus()) {
      const prevStatus = this._values[name].getStatus();

      if (!bitmapState.has(prevStatus, status)) {
        this._values[name] = this._values[name].setStatus(
          bitmapState.add(prevStatus, status),
        );
      }
    } else {
      this._values[name] = this._values[name].setStatus(
        bitmapState.encode(status),
      );
    }

    isNeedDispatch && this._dispatcher.dispatch('setStatus');
  }

  markAsSubmitting() {
    this.validate();

    Object.keys(this._values).forEach(key => {
      this.addStatus(key, STATUSES.SUBMITTING_STATUS);
    });

    this._isSubmitting = true;
    this._dispatcher.dispatch('submitting');
  }

  markAsSubmitted() {
    this.validate();

    Object.keys(this._values).forEach(key => {
      this.addStatus(key, STATUSES.SUBMITTED_STATUS);
    });

    this._isSubmitting = false;
    this._dispatcher.dispatch('submitted');
  }

  isValid() {
    return !!this._isValid;
  }

  _hasStatus(name, status) {
    return bitmapState.has(this._values[name].getStatus(), status);
  }

  getValue(name) {
    return this._values[name] && this._values[name].getValue();
  }

  getInitValue(name) {
    return this._initValues[name] && this._initValues[name].getValue();
  }

  getValueEntity(name) {
    return this._values[name] || StateStruct.createEmpty();
  }

  register(callback) {
    return this._dispatcher.register(callback);
  }

  getValues() {
    return Object.keys(this._values).reduce((result, key) => {
      result[key] = this._values[key].getValue();

      return result;
    }, {});
  }

  getChanges() {
    return Object.keys(this._values).reduce((result, key) => {
      const value = this._values[key].getValue();

      if (this._initValues[key].getValue() !== value) {
        result[key] = value;
      }

      return result;
    }, {});
  }

  getErrorText(name) {
    const value = this._values[name];

    if (!value.hasError()) {
      return '';
    }

    if (
      (this._errorStrategy === STRATEGIES.ON_SUBMIT ||
        this._errorStrategy === STRATEGIES.ON_BLUR_AND_SUBMIT ||
        this._errorStrategy === STRATEGIES.ON_TOUCH_AND_SUBMIT) &&
      (this._hasStatus(name, STATUSES.SUBMITTED_STATUS) ||
        this._hasStatus(name, STATUSES.SUBMITTING_STATUS))
    ) {
      return this._formatErrorText(value.getError(), name);
    }

    if (
      (this._errorStrategy === STRATEGIES.ON_BLUR ||
        this._errorStrategy === STRATEGIES.ON_BLUR_AND_SUBMIT) &&
      this._hasStatus(name, STATUSES.BLURRED_STATUS)
    ) {
      return this._formatErrorText(value.getError(), name);
    }

    if (
      this._errorStrategy === STRATEGIES.ON_TOUCH_AND_SUBMIT &&
      this._hasStatus(name, STATUSES.TOUCHED_STATUS) &&
      this._hasStatus(name, STATUSES.BLURRED_STATUS)
    ) {
      return this._formatErrorText(value.getError(), name);
    }

    return '';
  }

  _formatErrorText(code, name) {
    if (!code) {
      return '';
    }

    const text = this._errorCodes[code];

    if (typeof text === 'function') {
      return text(name, code) || '';
    }

    return text || code;
  }

  getErrors() {
    return { ...this._errors };
  }

  isFormDisabled() {
    return !!this._isDisabled;
  }

  isSubmitting() {
    return !!this._isSubmitting;
  }

  setDisabledStatus(isDisabled) {
    this._isDisabled = !!isDisabled;
    this._dispatcher.dispatch('setDisabledStatus');
  }

  registerCallback(callback) {
    return this._dispatcher.register(callback);
  }
}
