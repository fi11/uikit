import '@uikit/stylesheet';
import '@uikit/styled';

import React from 'react';
import DI from '@uikit/di';

import getView from './getView';

DI.provide('@uikit/createElement', null, { fabric: () => React.createElement.bind(React) });
DI.provide('@uikit/getView', null, { fabric: () => getView });