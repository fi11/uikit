import '@uikit/stylesheet';
import '@uikit/styled';

import React from 'react';
import DI from '@uikit/di';

DI.provide('@uikit/createElement', null, { fabric: () => React.createElement.bind(React) });
