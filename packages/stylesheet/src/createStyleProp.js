export const createStyleProp = styles => {
  return {
    key: 'className',
    value: styles.join(' '),
  };
};
