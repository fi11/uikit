import React from 'react';
import styled from '@uikit/styled';

const styles = {
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

if (typeof window !== undefined) {
  styles.zIndex = '999';
}

const OverlayStyled = styled(styles);
const Overlay = ({ color, opacity }) =>
  <OverlayStyled style={{ backgroundColor: color, opacity }} />;

Overlay.defaultProps = {
  color: '#fff',
  opacity: 0.45,
};

export default Overlay;
