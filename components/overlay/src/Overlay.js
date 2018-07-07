import styled from '@uikit/styled-react';

const Overlay = styled({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  color: color => ({
    background: color,
  }),
  opacity: opacity => ({
    opacity,
  }),
});

Overlay.defaultProps = {
  color: '#fff',
  opacity: 0.45,
};

export default Overlay;
