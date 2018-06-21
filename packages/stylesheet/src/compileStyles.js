import StyleSheet from './StyleSheet';

const getClassName = key => key.replace(/:/g, '-');

export default (elementName, styleRules) => {
  const styleRulesAsFunc = {};

  const compiledRules = StyleSheet.create(
    Object.keys(styleRules).reduce((result, key) => {
      const rule = styleRules[key];

      const container = typeof rule === 'object' ? result : styleRulesAsFunc;

      container[getClassName(key)] = styleRules[key];

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
