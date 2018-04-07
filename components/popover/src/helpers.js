type Rect = {
  top: number,
  left: number,
  height: number,
  width: number,
};

type PopoverPreset = {
  xAxis: string,
  yAxis: string,
  tail: {
    offsetX: number,
    offsetY: number,
    toMiddle: boolean,
  },
};

type GetTailParamsPayload = {
  selfRect: Rect,
  targetRect: Rect,
  currentPreset: PopoverPreset,
  tailSize: number,
};

export const getTailParams = ({
  selfRect = {},
  targetRect = {},
  currentPreset,
  tailSize,
}: GetTailParamsPayload) => {
  const { xAxis, yAxis, offsetX = 0, offsetY = 0, tail = {} } = currentPreset;
  const defaultOffset = tailSize / 2;
  const defaultMiddleYOffset = selfRect.height / 2 - tailSize / 2;
  const defaultMiddleXOffset = selfRect.width / 2 - tailSize / 2;
  const maxYOffset = selfRect.height - tailSize;
  const maxXOffset = selfRect.width - tailSize;

  const toMiddleYOffset = targetRect.height / 2 - tailSize / 2 - offsetY;
  const toMiddleXOffset = targetRect.width / 2 - tailSize / 2 - offsetX;

  const tailStyle = {
    position: 'absolute',
    width: tailSize,
    height: tailSize,
  };

  if (xAxis === 'outside-left' && yAxis === 'inside-top') {
    let offset = defaultOffset;

    if (tail.isToMiddle) {
      offset = toMiddleYOffset;
    } else if (tail.offsetY || tail.offsetY === 0) {
      offset = Math.max(tail.offsetY, 0);
    }

    return {
      direction: 'right',
      style: {
        ...tailStyle,
        top: Math.min(offset, selfRect.height - tailSize) || 0,
        right: 0,
        transform: 'translate3d(100%, 0, 0)',
      },
    };
  }

  if (xAxis === 'outside-left' && yAxis === 'inside-bottom') {
    let offset = -defaultOffset;

    if (tail.isToMiddle) {
      offset = -toMiddleYOffset;
    } else if (tail.offsetY || tail.offsetY === 0) {
      offset = Math.max(tail.offsetY, -maxYOffset);
    }

    return {
      direction: 'right',
      style: {
        ...tailStyle,
        bottom: Math.max(-offset, 0) || 0,
        right: 0,
        transform: 'translate3d(100%, 0, 0)',
      },
    };
  }

  if (xAxis === 'outside-left' && yAxis === 'middle') {
    let offset = defaultMiddleYOffset;

    if (!tail.isToMiddle && (tail.offsetY || tail.offsetY === 0)) {
      offset = Math.min(defaultMiddleYOffset + tail.offsetY, maxYOffset);
    }

    return {
      direction: 'right',
      style: {
        ...tailStyle,
        top: Math.max(offset, 0) || 0,
        right: 0,
        transform: 'translate3d(100%, 0, 0)',
      },
    };
  }

  if (xAxis === 'outside-right' && yAxis === 'inside-top') {
    let offset = defaultOffset;

    if (tail.isToMiddle) {
      offset = toMiddleYOffset;
    } else if (tail.offsetY || tail.offsetY === 0) {
      offset = Math.max(tail.offsetY, 0);
    }

    return {
      direction: 'left',
      style: {
        ...tailStyle,
        top: Math.min(offset, selfRect.height - tailSize) || 0,
        left: 0,
        transform: 'translate3d(-100%, 0, 0)',
      },
    };
  }

  if (xAxis === 'outside-right' && yAxis === 'inside-bottom') {
    let offset = -defaultOffset;

    if (tail.isToMiddle) {
      offset = -toMiddleYOffset;
    } else if (tail.offsetY || tail.offsetY === 0) {
      offset = Math.max(tail.offsetY, -maxYOffset);
    }

    return {
      direction: 'left',
      style: {
        ...tailStyle,
        bottom: Math.max(-offset, 0) || 0,
        left: 0,
        transform: 'translate3d(-100%, 0, 0)',
      },
    };
  }

  if (xAxis === 'outside-right' && yAxis === 'middle') {
    let offset = defaultMiddleYOffset;

    if (!tail.isToMiddle && tail.offsetY) {
      offset = Math.min(defaultMiddleYOffset + tail.offsetY, maxYOffset);
    }

    return {
      direction: 'left',
      style: {
        ...tailStyle,
        top: Math.max(offset, 0) || 0,
        left: 0,
        transform: 'translate3d(-100%, 0, 0)',
      },
    };
  }

  if (xAxis === 'inside-left' && yAxis === 'outside-top') {
    let offset = defaultOffset;

    if (tail.isToMiddle) {
      offset = toMiddleXOffset;
    } else if (tail.offsetX || tail.offsetX === 0) {
      offset = Math.max(tail.offsetX, 0);
    }

    return {
      direction: 'bottom',
      style: {
        ...tailStyle,
        bottom: 0,
        left: Math.min(offset, maxXOffset) || 0,
        transform: 'translate3d(0, 100%, 0)',
      },
    };
  }

  if (xAxis === 'inside-right' && yAxis === 'outside-top') {
    let offset = -defaultOffset;

    if (tail.isToMiddle) {
      offset = -toMiddleXOffset;
    } else if (tail.offsetX || tail.offsetX === 0) {
      offset = Math.min(tail.offsetX, 0);
    }

    return {
      direction: 'bottom',
      style: {
        ...tailStyle,
        bottom: 0,
        right: Math.min(-offset, maxXOffset) || 0,
        transform: 'translate3d(0, 100%, 0)',
      },
    };
  }

  if (xAxis === 'middle' && yAxis === 'outside-top') {
    let offset = defaultMiddleXOffset;

    if (!tail.isToMiddle && tail.offsetX) {
      offset = Math.min(defaultMiddleXOffset + tail.offsetX, maxXOffset);
    }

    return {
      direction: 'bottom',
      style: {
        ...tailStyle,
        bottom: 0,
        left: Math.max(offset, 0) || 0,
        transform: 'translate3d(0, 100%, 0)',
      },
    };
  }

  if (xAxis === 'inside-left' && yAxis === 'outside-bottom') {
    let offset = defaultOffset;

    if (tail.isToMiddle) {
      offset = toMiddleXOffset;
    } else if (tail.offsetX || tail.offsetX === 0) {
      offset = Math.max(tail.offsetX, 0);
    }

    return {
      direction: 'top',
      style: {
        ...tailStyle,
        top: 0,
        left: Math.min(offset, maxXOffset) || 0,
        transform: 'translate3d(0, -100%, 0)',
      },
    };
  }

  if (xAxis === 'inside-right' && yAxis === 'outside-bottom') {
    let offset = -defaultOffset;

    if (tail.isToMiddle) {
      offset = -toMiddleXOffset;
    } else if (tail.offsetX || tail.offsetX === 0) {
      offset = Math.min(tail.offsetX, 0);
    }

    return {
      direction: 'top',
      style: {
        ...tailStyle,
        top: 0,
        right: Math.min(-offset, maxXOffset) || 0,
        transform: 'translate3d(0, -100%, 0)',
      },
    };
  }

  if (xAxis === 'middle' && yAxis === 'outside-bottom') {
    let offset = defaultMiddleXOffset;

    if (!tail.isToMiddle && tail.offsetX) {
      offset = Math.min(defaultMiddleXOffset + tail.offsetX, maxXOffset);
    }

    return {
      direction: 'top',
      style: {
        ...tailStyle,
        top: 0,
        left: Math.max(offset, 0) || 0,
        transform: 'translate3d(0, -100%, 0)',
      },
    };
  }

  return { direction: null, style: null };
};
