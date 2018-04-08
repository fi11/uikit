'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const Tail = ({ size, color, shadow, direction, style }) => {
  const tailSize = Math.sqrt(2 * Math.pow(size / 2, 2));

  return (
    <div
      style={{
        ...STYLES.tailRoot,
        width: size,
        height: size,
        ...(style || {}),
      }}
    >
      <i
        style={{
          ...STYLES.tail,
          ...(shadow ? { boxShadow: shadow } : {}),
          width: tailSize,
          height: tailSize,
          background: color,
          transform: getTailTransform(direction, size),
        }}
      />
    </div>
  );
};

Tail.propTypes = {
  /**
	 * Shadow css style like '0px 0px 6px rgba(114, 125, 129, .75)'
	 */
  shadow: PropTypes.string,
  /**
	 * Tail direction
	 */
  direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
  /**
	 * Tail color
	 */
  color: PropTypes.string,
  /**
	 * Custom tail size in px
	 */
  size: PropTypes.number,
  /**
	 * Extra styles
	 */
};

Tail.defaultProps = {
  color: '#fff',
  size: 14,
};

const getTailTransform = (direction, size) => {
  switch (direction) {
    case 'top':
      return `translate3d(${size / 2}px, ${size +
        size / 2}px, 0) rotate(225deg)`;
    case 'right':
      return `translate3d(0, ${size}px, 0) rotate(225deg)`;
    case 'bottom':
      return `translate3d(${size / 2}px, ${size / 2}px, 0) rotate(225deg)`;
    case 'left':
      return `translate3d(${size}px, ${size}px, 0) rotate(225deg)`;
  }
};

const STYLES = {
  tailRoot: {
    position: 'relative',
    overflow: 'hidden',
  },
  tail: {
    position: 'absolute',
    display: 'block',
    transformOrigin: 'top left',
  },
};

export default Tail;
