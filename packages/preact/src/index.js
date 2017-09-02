import Preact, { Component } from 'preact';

import DI from '@uikit/di';
import PropTypesFactory from 'prop-types/factoryWithThrowingShims';

import PureComponent from './PureComponent';

DI.provide('@uikit/createElement', null, {
  fabric: () => Preact.createElement.bind(Preact),
});
DI.provide('@uikit/cloneElement', null, {
  fabric: () => Preact.cloneElement.bind(Preact),
});
DI.provide('@uikit/PropTypes', null, { fabric: () => PropTypesFactory() });
DI.provide('@uikit/Component', null, { fabric: () => Component });
DI.provide('@uikit/PureComponent', null, { fabric: () => PureComponent });
