import DI from '@uikit/di';

const getClassName = (prefix, name) => `${prefix}_${name}`.replace(/:/g, '-');

let View;

const styled = (element, styleRules) => {
  const createElement = DI.get('@uikit/createElement');
  const StyleSheet = DI.get('@uikit/StyleSheet');

  if (typeof styleRules === 'undefined') {
    styleRules = element;
    element = View || styled('div.View', {
      root: {
        display: 'flex',
        flexShrink: 0,
        boxSizing: 'border-box',
      }
    });
  }

  if (!element.__IS_WRAPPER__ && typeof element !== 'string') {
    throw new Error(
      'styled error: you must use string or another styled component as element argument',
    );
  }

  if (element.__IS_WRAPPER__) {
    const prevStyles = element.getRawStyles();
    styleRules = Object.keys(styleRules).reduce((result, key) => {
      result[key] = { ...prevStyles[key], ...styleRules[key] };

      return result;
    }, { ...prevStyles });
  }

  let [tag, elementName] = element.__IS_WRAPPER__
    ? [element.getTagName(), element.name || element.getElementName()]
    : element.split('.');

  elementName = elementName || 's';

  const classNames = StyleSheet.create(Object.keys(styleRules).reduce((result, key) => {
    result[getClassName(elementName, key)] = styleRules[key];

    return result;
  }, {}));

  const Wrapper = new Function(
    'createElement',
    `return function Styled${elementName === 's'
      ? elementName
      : elementName.replace(
          /^Styled/,
          '',
        )}(props){ return createElement(props) }`,
  )((props) => {
    const styles = Object.keys(styleRules).reduce((result, key) => {
      const clearKey = key.replace(/:\w+/g, '');
      const propValue = props[clearKey];

      if (key === 'root') {
        result.push(classNames[getClassName(elementName, key)]);

        return result;
      }

      if (propValue) {
        if (typeof propValue === 'function') {
          throw new Error('styles as function not support yet');
        }

        if (/:\w+/g.test(key)) {
          const cn = classNames[getClassName(elementName, `${clearKey}:${propValue}`)];
          cn && result.push(cn);

          return result;
        }

        result.push(classNames[getClassName(elementName, key)]);
      }

      return result;
    }, []);


    return createElement(tag, {
      ...props,
      className: styles.join(' '),
    });
  });

  Wrapper.getRawStyles = () => ({ ...styleRules });
  Wrapper.getTagName = () => tag;
  Wrapper.getElementName = () => elementName;
  Wrapper.__IS_WRAPPER__ = true;

  return Wrapper;
};

export default styled;