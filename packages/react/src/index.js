import React, { Component, PureComponent } from 'react';
import DI from '@uikit/di';
import PropTypes from 'prop-types';

DI.provide('@uikit/createElement', null, {
  fabric: () => React.createElement.bind(React),
});
DI.provide('@uikit/cloneElement', null, {
  fabric: () => React.cloneElement.bind(React),
});
DI.provide('@uikit/PropTypes', null, { fabric: () => PropTypes });
DI.provide('@uikit/Component', null, { fabric: () => Component });
DI.provide('@uikit/PureComponent', null, { fabric: () => PureComponent });
