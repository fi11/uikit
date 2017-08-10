import DI from '@uikit/di';

const styled = DI.get('@uikit/styled');

const styles = {
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
};

if (typeof window !== undefined) {
  styles.root.zIndex = '999';
}

const Overlay = styled(styles);
// const Overlay = ({ color, opacity }) => createElement(OverlayStyled, {
//   style: {
//     backgroundColor: color,
//       opacity
//   },
// });

Overlay.defaultProps = {
  color: '#fff',
  opacity: 0.45,
};

export default Overlay;
