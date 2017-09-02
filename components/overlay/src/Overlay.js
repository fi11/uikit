import DI from '@uikit/di';
const styled = DI.get('@uikit/styled');

const Overlay = styled({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: '999',
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
