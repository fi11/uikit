import React from 'react';
import '@uikit/stylesheet';
import DI from '@uikit/di';

DI.provide('@uikit/createElement', null, { fabric: () => React.createElement.bind(React) });
