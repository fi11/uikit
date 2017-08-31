// @flow
/**
 * A secret key that is used to prevent direct construction of these objects,
 * this is effectively used to ensure that the constructor is private.
 */
const SECRET = `SECRET_${Math.random()}`;

type ConstructorPayload = {
  secret: string,
  status: string,
  value: any,
  error: any,
  hasValue: boolean,
  creationTimestamp: number
}

const NONE_STATUS = 'NONE';

const CONSTRUCTOR_PAYLOAD = {
  secret: SECRET,
  status: NONE_STATUS,
  value: null,
  error: null,
  hasValue: false,
  creationTimestamp: 0,
};


export default class StateStruct {
  _status: string;
  _value: any;
  _error: any;
  _hasValue: boolean;
  _creationTimestamp: number;
  _modificationTimestamp: number;

  static NONE_STATUS = NONE_STATUS;

  static createEmpty() {
    return new this({
      ...CONSTRUCTOR_PAYLOAD,
      creationTimestamp: +new Date(),
    });
  }

  static createWithValue(value: any) {
    return new this({
      ...CONSTRUCTOR_PAYLOAD,
      value: value,
      hasValue: true,
      creationTimestamp: +new Date(),
    });
  }

  static createWithError(error: any): StateStruct {
    return new this({
      ...CONSTRUCTOR_PAYLOAD,
      error: error,
      creationTimestamp: +new Date(),
    });
  }

  static createWithStatus(status: string): StateStruct {
    return new this({
      ...CONSTRUCTOR_PAYLOAD,
      status:  status,
      creationTimestamp: +new Date(),
    });
  }

  constructor({ secret, status, value, error, hasValue, creationTimestamp }: ConstructorPayload) {
    if (secret !== SECRET) {
      throw new Error(
        'StateStruct constructor error: constructor is not public, ' +
        'use static methods: ' +
        'createEmpty, ' +
        'createWithValue, ' +
        'createWithStatus, ' +
        'createWithError'
      );
    }

    this._status = status;
    this._value = value;
    this._error = error;
    this._hasValue = hasValue;
    this._creationTimestamp = creationTimestamp;
    this._modificationTimestamp = +new Date();
  }

  _getConstructorPayload(payload: Object): ConstructorPayload {
    return {
      secret: SECRET,
      status: this._status,
      value: this._value,
      error: this._error,
      creationTimestamp: this._creationTimestamp,
      hasValue: this._hasValue,
      ...payload,
    };
  }

  setValue(value: any): StateStruct {
    return new this.constructor(this._getConstructorPayload({
      value,
      hasValue: true,
    }));
  }

  updateValue(updater: (value: any) => any): StateStruct {
    if (!this._hasValue) {
      return this;
    }

    return new this.constructor(this._getConstructorPayload({
      value: updater(this._value),
      hasValue: true,
    }));
  }

  removeValue(value: any): StateStruct {
    return new this.constructor(this._getConstructorPayload({
      secret: SECRET,
      value: null,
      hasValue: false,
    }));
  }

  setError(error: any): StateStruct {
    return new this.constructor(this._getConstructorPayload({
      error: error,
    }));
  }

  removeError(): StateStruct {
    return new this.constructor(this._getConstructorPayload({
      secret: SECRET,
      error: null,
    }));
  }

  setStatus(status: string): StateStruct {
    return new this.constructor(this._getConstructorPayload({
      status: status,
    }));
  }

  setNoneStatus(): StateStruct {
    return this.setStatus(NONE_STATUS);
  }

  hasValue(): boolean {
    return this._hasValue;
  }

  isEmpty(): boolean {
    return !this._hasValue &&
      this._error === null &&
      this._status === NONE_STATUS;
  }

  hasModification(): boolean {
    return this._creationTimestamp !== this._modificationTimestamp;
  }

  hasStatus(): boolean {
    return this._status !== NONE_STATUS;
  }

  hasError(): boolean {
    return this._error !== null;
  }

  getStatus(): string {
    return this._status;
  }

  getError(): any {
    return this._error;
  }

  getValue(): any {
    return this._value;
  }

  getCreationTimestamp(): number {
    return this._creationTimestamp;
  }

  getModificationTimestamp(): number {
    return this._modificationTimestamp;
  }
}