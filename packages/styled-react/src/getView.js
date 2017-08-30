let View;

export default styled => {
  return (
    View ||
    styled('div.View', {
      root: {
        display: 'flex',
        flexShrink: 0,
        boxSizing: 'border-box',
      },
    })
  );
};
