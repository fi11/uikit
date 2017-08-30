import DI from '@uikit/di';

const styled = (element, styleRules) => {
  const createElement = DI.get('@uikit/createElement');
  const compileStyles = DI.get('@uikit/compileStyles');
  const getView = DI.get('@uikit/getView');
  const createStyleProps = DI.get('@uikit/createStyleProps');

  if (typeof styleRules === 'undefined') {
    styleRules = element;
    element = getView(styled);
  }

  if (element.__IS_WRAPPER__) {
    const prevStyles = element.getRawStyles();
    styleRules = Object.keys(styleRules).reduce(
      (result, key) => {
        if (typeof styleRules[key] === 'function') {
          result[key] = styleRules[key];
        } else {
          result[key] = {
            ...prevStyles[key],
            ...styleRules[key],
          };
        }

        return result;
      },
      { ...prevStyles },
    );
  }

  let [tag, elementName] = element.__IS_WRAPPER__
    ? [element.getTagName(), element.name || element.getElementName()]
    : typeof element === 'string' ? element.split('.') : [null, element.name];

  elementName = elementName || 's';

  const compiledStyles = compileStyles(elementName, styleRules);

  const Wrapper = new Function(
    'createElement',
    `return function Styled${elementName === 's'
      ? elementName
      : elementName.replace(
          /^Styled/,
          '',
        )}(props){ return createElement(props) }`,
  )(props => {
    const styles = Object.keys(styleRules).reduce((result, key) => {
      const clearKey = key.replace(/:\w+/g, '');
      const propValue = props[clearKey];

      if (key === 'root') {
        result.push(compiledStyles.get(key));

        return result;
      }

      if (propValue) {
        if (typeof styleRules[key] === 'function') {
          result.push(compiledStyles.get(key, propValue));
          return result;
        }

        if (/:\w+/g.test(key)) {
          const st = compiledStyles.get(`${clearKey}:${propValue}`);
          st && result.push(st);

          return result;
        }

        result.push(compiledStyles.get(key));
      }

      return result;
    }, []);

    const newProps = Object.keys(props).reduce((result, key) => {
      if (!styleRules[key]) {
        result[key] = props[key];
      }

      return result;
    }, {});

    return createElement(tag || element, {
      ...newProps,
      ...createStyleProps(styles),
    });
  });

  Wrapper.getRawStyles = () => ({ ...styleRules });
  Wrapper.getTagName = () => tag;
  Wrapper.getElementName = () => elementName;
  Wrapper.__IS_WRAPPER__ = true;

  return Wrapper;
};

export default styled;
