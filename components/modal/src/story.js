import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { TeleportContext } from '@uikit/teleport';
import Overlay from '@uikit/overlay';
import Modal from './index';
import StateProvider from '@uikit/state-provider';

const CustomModal = ({ children, isShown, onClose }) => (
  <Modal
    isShown={isShown}
    isAutoClosable={true}
    onRequestClose={onClose}
    overlayRenderer={({ isEnter, isLeave, isUpdate, isAppear, isInit }) => (
      <Overlay
        color={'#000'}
        style={{
          opacity: isEnter ? 0.4 : 0,
          position: 'fixed',
          width: '100%',
          height: '100%',
          transition: 'all .4s ease-out',
        }}
      />
    )}
    bodyRenderer={({
      children,
      isEnter,
      isLeave,
      isUpdate,
      isAppear,
      isInit,
    }) => (
      <div
        style={{
          width: 400,
          height: 400,
          padding: 20,
          background: '#fff',
          position: 'relative',
          margin: '0 auto',
          top: '50%',
          opacity: isEnter ? 1 : 0,
          transition: 'all .25s ease-out',
          transform: isEnter ? 'translateY(-50%)' : 'translateY(-100%)',
        }}
      >
        <div style={{ marginBottom: 10 }}>
          <button onClick={onClose}>close modal</button>
        </div>
        {children}
      </div>
    )}
  >
    {children}
  </Modal>
);
storiesOf('helpers/Modal', module)
  .add('Shown modal', () => (
    <TeleportContext>
      <div style={{ width: '100%', height: '100%' }}>
        <CustomModal isShown={true}>Modal component</CustomModal>
      </div>
    </TeleportContext>
  ))
  .add('Hidden modal', () => (
    <TeleportContext>
      <div style={{ width: '100%', height: '100%' }}>
        <CustomModal isShown={false}>Modal component</CustomModal>
      </div>
    </TeleportContext>
  ))
  .add('Shown and hide modal', () => (
    <TeleportContext>
      <div style={{ width: '100%', height: '100%' }}>
        <StateProvider>
          {(state, setState) => (
            <div>
              <CustomModal
                isShown={state.isShown}
                onClose={() => setState({ isShown: false })}
              >
                Modal component
              </CustomModal>
              <button onClick={() => setState({ isShown: true })}>
                show modal
              </button>
            </div>
          )}
        </StateProvider>
      </div>
    </TeleportContext>
  ))
  .add('With body scroll', () => (
    <TeleportContext>
      <div style={{ width: '100%', height: 3000 }}>
        <StateProvider>
          {(state, setState) => (
            <div>
              <CustomModal
                isShown={state.isShown}
                onClose={() => setState({ isShown: false })}
              >
                Modal component
              </CustomModal>
              <button onClick={() => setState({ isShown: true })}>
                show modal
              </button>
            </div>
          )}
        </StateProvider>
      </div>
    </TeleportContext>
  ))
  .add('With body scroll and modal scroll', () => (
    <TeleportContext>
      <div style={{ width: '100%', height: 3000 }}>
        <StateProvider>
          {(state, setState) => (
            <div>
              <CustomModal
                isShown={state.isShown}
                onClose={() => setState({ isShown: false })}
              >
                <div style={{ height: 1000 }}>Modal component</div>
              </CustomModal>
              <button onClick={() => setState({ isShown: true })}>
                show modal
              </button>
            </div>
          )}
        </StateProvider>
      </div>
    </TeleportContext>
  ));
