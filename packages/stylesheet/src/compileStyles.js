import DI from '@uikit/di';

const getClassName = (prefix, name) => `${prefix}_${name}`.replace(/:/g, '-');

export default (elementName, styleRules) => {
  const StyleSheet = DI.get('@uikit/StyleSheet');
  const styleRulesAsFunc = {};

  const compiledRules = StyleSheet.create(
    Object.keys(styleRules).reduce((result, key) => {
      const rule = styleRules[key];

      const container = typeof rule === 'object' ? result : styleRulesAsFunc;

      container[getClassName(elementName, key)] = styleRules[key];

      return result;
    }, {}),
  );

  return {
    get: (key, arg) => {
      if (arg) {
        return StyleSheet.create({
          [key]: styleRulesAsFunc[getClassName(elementName, key)](arg),
        })[key];
      }
      return compiledRules[getClassName(elementName, key)];
    },
  };
};
