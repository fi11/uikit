export default styles => {
  return {
    key: 'style',
    value: styles.filter(i => i || i === 0),
  };
};
