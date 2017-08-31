export default class Dispatcher {
  constructor({ isReverse, isStrictMode } = {}) {
    this._listeners = [];
    this._isReverse = isReverse;
    this._isStrictMode = isStrictMode;
    this._callbackCount = 0;
    this._isPending = false;
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
    if (this._isStrictMode) {
      if (this._isPending) {
        throw new Error(
          `Dispatcher error: can't dispatch message during dispatching previous`,
        );
      }
      this._isPending = true;
    }

    if (this._isReverse) {
      for (let i = len - 1; i > -1; i--) {
        this._callCallback(i, payload);
      }
    } else {
      for (let i = 0; i < len; i++) {
        this._callCallback(i, payload);
      }
    }

    this._isPending = false;
  }
}
