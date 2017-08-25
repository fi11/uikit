export default class Dispatcher {
  constructor() {
    this._listeners = [];
  }

  register(callback) {
    this._listeners.push(callback);

    return () => {
      this._listeners = this._listeners.filter(c => c !== callback);
    }
  }

  dispatch(payload) {
    this._listeners.forEach(callback => callback(payload));
  }
}