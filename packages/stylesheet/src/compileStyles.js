import StyleSheet from './StyleSheet';

const cache = {};
const getClassName = key => key.replace(/:/g, '-');
const getCacheKey = (key, arg, id) => `${key}:${JSON.stringify(arg)}:${id}`;

export const compileStyles = (elementName, styleRules, id) => {
  const styleRulesAsFunc = {};

  const sheets = StyleSheet.create(
    Object.keys(styleRules).reduce((result, key) => {
      const rule = styleRules[key];
      const container = typeof rule === 'object' ? result : styleRulesAsFunc;

      container[getClassName(key)] = styleRules[key];

      return result;
    }, {}),
  );

  const compiledRules = sheets.classes;

  return {
    get: (key, arg, registry) => {
      if (arg) {
        const cacheKey = getCacheKey(key, arg, id);

        if (!cache[cacheKey]) {
          const sheets = StyleSheet.create({
            [key]: styleRulesAsFunc[getClassName(key)](arg),
          });

          cache[cacheKey] = sheets.classes[key];
          if (registry) {
            registry.add(sheets);
          }

          return cache[cacheKey];
        }

        return cache[cacheKey];
      }

      return compiledRules[getClassName(key)];
    },
    register(registry) {
      registry.add(sheets);
    }
  };
};
