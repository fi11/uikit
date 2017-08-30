import { StyleSheet } from 'react-native';

export default (elementName, styleRules) => {
  const styleRulesAsFunc = {};

  const styles = StyleSheet.create(Object.keys(styleRules).reduce((result, key) => {
    const rule = styleRules[key];

    const container = typeof rule === 'object' ? result : styleRulesAsFunc;

    container[key] = styleRules[key];

    return result;
  }, {}));

  return {
    get: (key, arg) => {
      if (arg) {
        return StyleSheet.create({
          [key]: styleRulesAsFunc[key](arg),
        })[key];
      }
      return styles[key];
    },
  };
};
