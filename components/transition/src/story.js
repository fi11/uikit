import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import StateProvider from '@uikit/state-provider';
import Transition from './index';

storiesOf('helpers/Transition', module).add('Popup with transition', () => (
  <StateProvider>
    {(state, setState) => (
      <div style={{ height: 500 }}>
        <button onClick={() => setState({ isShown: !state.isShown })}>
          {state.isShown ? 'Hide' : 'Show'}
        </button>
        <Transition>
          {state.isShown &&
            (({ isAppear, isEnter, isLeave, isUpdate }) => (
              <div
                style={{
                  marginTop: 30,
                  transition: 'all 0.8s ease-out',
                  opacity: isEnter ? 1 : 0,
                  transform: `translateY(${isEnter ? 0 : '60%'})`,
                }}
              >
                Some awesome content...
              </div>
            ))}
        </Transition>
      </div>
    )}
  </StateProvider>
));
