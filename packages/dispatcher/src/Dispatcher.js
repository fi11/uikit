export default class Dispatcher {
  constructor({ reverse } = {}) {
    this._listeners = [];
    this._reverse = reverse;
    this._callbackCount = 0;
  }

  register(callback) {
    this._listeners.push(callback);
    this._callbackCount = this._listeners.length;

    return () => {
      this._listeners = this._listeners.filter(c => c !== callback);
      this._callbackCount = this._listeners.length;
    };
  }

  _callCallback(idx, payload) {
    const cb = this._listeners[idx];

    if (typeof cb === 'function') {
      cb(payload);
    }
  }

  getSize() {
    return this._callbackCount;
  }

  dispatch(payload) {
    const len = this._callbackCount;

    if (this._reverse) {
      for (let i = len - 1; i > -1; i--) {
        this._callCallback(i, payload);
      }
    } else {
      for (let i = 0; i < len; i++) {
        this._callCallback(i, payload);
      }
    }
  }
}
