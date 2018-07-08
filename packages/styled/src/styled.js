let idCount = 0;

const removeTrashFromProps = (props, styleRules) => {
  const propsToDelete = Object.keys(styleRules)
    .map(i => i.replace(/:.+$/, ''))
    .reduce((result, key) => {
      result[key] = true;

      return result;
    }, {});

  return Object.keys(props).reduce((result, key) => {
    if (!propsToDelete[key] && key !== 'as') {
      result[key] = props[key];
    }

    return result;
  }, {});
};

export const createStyled = ({
  createElement,
  compileStyles,
  getView,
  createStyleProp,
}) => {
  const styled = (element, styleRules) => {
    const uniqID = ++idCount;

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
      : typeof element === 'string'
        ? element.split('.')
        : [null, element.name];

    elementName = elementName || 's';

    const compiledStyles = compileStyles(elementName, styleRules, uniqID);
    const getComponentProps = props => {
      let styles = Object.keys(styleRules).reduce((result, key) => {
        const clearKey = key.replace(/:\w+/g, '');
        const propValue = props[clearKey];

        if (key === 'root') {
          result[compiledStyles.get(key)] = true;
          return result;
        }

        if (propValue) {
          if (typeof styleRules[key] === 'function') {
            result[compiledStyles.get(key, propValue)] = true;
            return result;
          }

          if (/:\w+/g.test(key)) {
            const st = compiledStyles.get(`${clearKey}:${propValue}`);
            if (st) {
              result[st] = true;
            }

            return result;
          }

          result[compiledStyles.get(key)] = true;
        }

        return result;
      }, {});

      styles = Object.keys(styles);

      const styleProp = createStyleProp(styles);

      const newProps = {
        ...removeTrashFromProps(props, styleRules),
      };

      if (styleProp.key === 'className' && props.className) {
        newProps[styleProp.key] = `${styleProp.value} ${props.className}`;
      } else if (
        styleProp.key === 'style' &&
        props.style &&
        typeof props.style === 'object' &&
        typeof styleProp.value === 'object'
      ) {
        newProps[styleProp.key] = { ...props.style, ...styleProp.value };
      } else {
        newProps[styleProp.key] = styleProp.value || props[styleProp.key];
      }

      return newProps;
    };

    const Styled = ({ as, ...props }) => {
      if (as && as.__IS_WRAPPER__) {
        const AsStyled = styled(as, styleRules);
        return createElement(AsStyled, props);
      }

      return createElement(as ? as : tag || element, getComponentProps(props));
    };

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

  return styled;
};
