export default class Validator {
  schema;
  constructor() {
    this._executeAllRules = this._executeAllRules.bind(this);
    this._validateData = this._validateData.bind(this);
    this._createResult = this._createResult.bind(this);
    this.execute = this.execute.bind(this);
  }

  _executeAllRules(rules, key, data) {
    return rules.reduce((errors, rule) => {
      if (typeof rule !== 'function') {
        throw new Error(
          'AbstractValidator error: bad schema, rule must be a function',
        );
      }

      const result = rule(key, data);

      if (!result.isValid) {
        errors.push(result.code);
      }

      return errors;
    }, []);
  }

  _validateData(data) {
    if (!this.schema || typeof this.schema !== 'object') {
      return null;
    }

    let result = Object.keys(this.schema || {}).reduce((errors, key) => {
      const rules = this.schema[key];

      if (!Array.isArray(rules)) {
        throw new Error(
          'AbstractValidator error: bad schema, rules must be an Array of functions',
        );
      }

      const validateResult = this._executeAllRules(rules, key, data);

      if (validateResult.length) {
        errors[key] = validateResult;
      }

      return errors;
    }, {});

    return this._createResult(result);
  }

  _createResult(errors) {
    return errors ? (Object.keys(errors).length ? errors : null) : null;
  }

  execute(data: Object) {
    return this._validateData(data);
  }
}
