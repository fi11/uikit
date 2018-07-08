import StyleSheet from './StyleSheet';

const cache = {};
const getClassName = key => key.replace(/:/g, '-');
const getCacheKey = (key, arg, id) => `${key}:${JSON.stringify(arg)}:${id}`;

export const compileStyles = (elementName, styleRules, id) => {
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
        const cacheKey = getCacheKey(key, arg, id);
        if (!cache[cacheKey]) {
          return cache[cacheKey] = StyleSheet.create({
            [key]: styleRulesAsFunc[getClassName(key)](arg),
          })[key];
        }

        return cache[cacheKey];
      }
      return compiledRules[getClassName(key)];
    },
  };
};
