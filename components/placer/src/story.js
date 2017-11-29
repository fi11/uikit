import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TeleportContext } from '@uikit/teleport';

import StateProvider from '@uikit/state-provider';

import Placer from './index';

const Target = () => (
  <div style={{ padding: '20px', background: '#eee', width: '200px' }}>
    Target
  </div>
);

const Placeable = () => (
  <div
    style={{
      padding: '8px',
      background: '#333',
      width: '100px',
      color: '#fff',
    }}
  >
    Placeable
  </div>
);

storiesOf('Placer', module)
  .add('Y axis outside top', () => (
    <TeleportContext>
      <div style={{ margin: '40px' }}>
        <Placer
          presets={[{ xAxis: 'middle', yAxis: 'outside-top' }]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
      </div>
    </TeleportContext>
  ))
  .add('Y axis outside bottom', () => (
    <TeleportContext>
      <div style={{ margin: '40px' }}>
        <Placer
          presets={[{ xAxis: 'middle', yAxis: 'outside-bottom' }]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
      </div>
    </TeleportContext>
  ))
  .add('Y axis middle', () => (
    <TeleportContext>
      <div style={{ margin: '40px' }}>
        <Placer
          presets={[{ xAxis: 'middle', yAxis: 'middle' }]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
      </div>
    </TeleportContext>
  ))
  .add('Y axis inside top', () => (
    <TeleportContext>
      <div style={{ margin: '40px' }}>
        <Placer
          presets={[{ xAxis: 'middle', yAxis: 'inside-top' }]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
      </div>
    </TeleportContext>
  ))
  .add('Y axis inside bottom', () => (
    <TeleportContext>
      <div style={{ margin: '40px' }}>
        <Placer
          presets={[{ xAxis: 'middle', yAxis: 'inside-bottom' }]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
      </div>
    </TeleportContext>
  ))
  .add('X axis outside left', () => (
    <TeleportContext>
      <div style={{ margin: '40px' }}>
        <Placer
          presets={[{ xAxis: 'outside-left', yAxis: 'middle' }]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
      </div>
    </TeleportContext>
  ))
  .add('X axis outside right', () => (
    <TeleportContext>
      <div style={{ margin: '40px' }}>
        <Placer
          presets={[{ xAxis: 'outside-right', yAxis: 'middle' }]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
      </div>
    </TeleportContext>
  ))
  .add('X axis middle', () => (
    <TeleportContext>
      <div style={{ margin: '40px' }}>
        <Placer
          presets={[{ xAxis: 'middle', yAxis: 'middle' }]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
      </div>
    </TeleportContext>
  ))
  .add('X axis inside left', () => (
    <TeleportContext>
      <div style={{ margin: '40px' }}>
        <Placer
          presets={[{ xAxis: 'inside-left', yAxis: 'middle' }]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
      </div>
    </TeleportContext>
  ))
  .add('X axis inside right', () => (
    <TeleportContext>
      <div style={{ margin: '40px' }}>
        <Placer
          presets={[{ xAxis: 'inside-right', yAxis: 'middle' }]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
      </div>
    </TeleportContext>
  ))
  .add('Auto position left top corner', () => (
    <TeleportContext>
      <div style={{ margin: '40px' }}>
        <Placer
          presets={[
            { xAxis: 'inside-right', yAxis: 'outside-top' },
            { xAxis: 'inside-left', yAxis: 'outside-bottom' },
            { xAxis: 'outside-left', yAxis: 'outside-top' },
          ]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
      </div>
    </TeleportContext>
  ))
  .add('Auto position right top corner', () => (
    <TeleportContext>
      <div style={{ margin: '40px' }}>
        <Placer
          presets={[
            { xAxis: 'inside-left', yAxis: 'outside-top' },
            { xAxis: 'outside-left', yAxis: 'middle' },
            { xAxis: 'inside-left', yAxis: 'outside-bottom' },
          ]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
      </div>
    </TeleportContext>
  ))
  .add('Auto position left bottom corner', () => (
    <TeleportContext>
      <div style={{ margin: '40px' }}>
        <Placer
          presets={[
            { xAxis: 'inside-right', yAxis: 'outside-bottom' },
            { xAxis: 'inside-left', yAxis: 'outside-top' },
          ]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
      </div>
    </TeleportContext>
  ))
  .add('Auto position right bottom corner', () => (
    <TeleportContext>
      <div style={{ margin: 0 }}>
        <Placer
          presets={[
            { xAxis: 'inside-left', yAxis: 'outside-bottom' },
            { xAxis: 'inside-right', yAxis: 'outside-top' },
          ]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
      </div>
    </TeleportContext>
  ))
  .add('Position with scroll', () => (
    <TeleportContext>
      <div style={{ margin: '900px 0' }}>
        <Placer
          presets={[
            { xAxis: 'inside-left', yAxis: 'outside-bottom' },
            { xAxis: 'inside-right', yAxis: 'outside-top' },
          ]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
      </div>
    </TeleportContext>
  ))
  .add('Position with inner scroll', () => (
    <TeleportContext>
      <div style={{ margin: 0, width: 300, height: 300, overflow: 'scroll' }}>
        <div style={{ margin: '300px 100px' }}>
          <Placer
            presets={[
              { xAxis: 'inside-left', yAxis: 'outside-bottom' },
              { xAxis: 'inside-right', yAxis: 'outside-top' },
            ]}
            content={<Placeable />}
          >
            <Target />
          </Placer>
        </div>
      </div>
    </TeleportContext>
  ))
  .add('Custom offsets', () => (
    <TeleportContext>
      <div style={{ margin: 40 }}>
        <Placer
          presets={[
            {
              xAxis: 'inside-right',
              yAxis: 'inside-top',
              offsetX: 10,
              offsetY: -15,
            },
          ]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
      </div>
    </TeleportContext>
  ))
  .add('Custom position', () => (
    <TeleportContext>
      <div>
        <StateProvider>
          {(state, setState) => (
            <div style={{ margin: '40px' }}>
              <button
                onClick={() => {
                  function handler(e) {
                    window.removeEventListener('click', handler);
                    setState({
                      rect: {
                        left: e.clientX - 10,
                        top: e.clientY - 10,
                        height: 20,
                        width: 20,
                      },
                    });
                  }

                  setState({ rect: null }, () =>
                    setTimeout(
                      () => window.addEventListener('click', handler),
                      100,
                    ),
                  );
                }}
              >
                Click me, then click to any place
              </button>
              {state.rect && (
                <Placer
                  targetRect={state.rect}
                  presets={[{ xAxis: 'middle', yAxis: 'middle' }]}
                  content={
                    <div
                      onClick={() => setState({ rect: null })}
                      style={{
                        padding: '8px',
                        background: 'red',
                        color: '#fff',
                        cursor: 'pointer',
                      }}
                    >
                      Click me for destroy
                    </div>
                  }
                />
              )}
            </div>
          )}
        </StateProvider>
      </div>
    </TeleportContext>
  ));
