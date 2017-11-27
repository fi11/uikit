import DI from '@uikit/di';

const removeTrashFormProps = (props, styleRules) => {
  const propsToDelete = Object.keys(styleRules)
    .map(i => i.replace(/:.+$/, ''))
    .reduce((result, key) => {
      result[key] = true;

      return result;
    }, {});

  return Object.keys(props).reduce((result, key) => {
    if (!propsToDelete[key]) {
      result[key] = props[key];
    }

    return result;
  }, {});
};

const styled = (element, styleRules) => {
  const createElement = DI.get('@uikit/createElement');
  const compileStyles = DI.get('@uikit/compileStyles');
  const getView = DI.get('@uikit/getView');
  const createStyleProp = DI.get('@uikit/createStyleProp');

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
  const getComponentProps = props => {
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

    const styleProp = createStyleProp(styles);

    return {
      ...removeTrashFormProps(props, styleRules),
      [styleProp.key]: props[styleProp.key] || styleProp.value,
    };
  };

  const Styled = props =>
    createElement(tag || element, getComponentProps(props));

  Styled.getRawStyles = () => ({ ...styleRules });
  Styled.getTagName = () => tag;
  Styled.setTagName = value => (tag = value);
  Styled.getElementName = () => elementName;
  Styled.__IS_WRAPPER__ = true;

  if (element.defaultProps) {
    Styled.defaultProps = element.defaultProps;
  }

  if (element.propTypes) {
    Styled.propTypes = element.propTypes;
  }

  return Styled;
};

export default styled;
