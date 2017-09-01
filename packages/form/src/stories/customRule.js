export default (code, eq) => {
  return (key, data) => {
    return { code: code, isValid: data[key] === eq};
  };
};