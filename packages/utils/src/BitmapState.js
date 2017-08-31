export default class BitmapState {
  constructor(states = []) {
    this._states = states;
    this._availableValues = {};
    this._availableStates = states.reduce((result, status, idx) => {
      const value = Math.pow(2, idx);

      result[status] = value;
      this._availableValues[value] = status;
      return result;
    }, {});
  }

  encode(state) {
    const value = this._availableStates[state];

    if (typeof value === 'undefined') {
      throw new Error(
        `BitmapState error: unavailable state value, use one of: ${this._states.join(
          ',',
        )}`,
      );
    }

    return value;
  }

  add(value, state) {
    return value | this.encode(state);
  }

  remove(value, state) {
    return value & ~this.encode(state);
  }

  has(value, state) {
    return Boolean(value & this.encode(state));
  }
}
