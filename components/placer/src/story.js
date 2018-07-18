import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

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
  .addDecorator(fn => (
  <div style={{ margin: '40px' }}>
    {fn()}
  </div>
  ))
  .add('Y axis outside top', () => (
        <Placer
          presets={[{ xAxis: 'middle', yAxis: 'outside-top' }]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
  ))
  .add('Y axis outside bottom', () => (
        <Placer
          presets={[{ xAxis: 'middle', yAxis: 'outside-bottom' }]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
  ))
  .add('Y axis middle', () => (
        <Placer
          presets={[{ xAxis: 'middle', yAxis: 'middle' }]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
  ))
  .add('Y axis inside top', () => (
        <Placer
          presets={[{ xAxis: 'middle', yAxis: 'inside-top' }]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
  ))
  .add('Y axis inside bottom', () => (
        <Placer
          presets={[{ xAxis: 'middle', yAxis: 'inside-bottom' }]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
  ))
  .add('X axis outside left', () => (
        <Placer
          presets={[{ xAxis: 'outside-left', yAxis: 'middle' }]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
  ))
  .add('X axis outside right', () => (
        <Placer
          presets={[{ xAxis: 'outside-right', yAxis: 'middle' }]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
  ))
  .add('X axis middle', () => (
        <Placer
          presets={[{ xAxis: 'middle', yAxis: 'middle' }]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
  ))
  .add('X axis inside left', () => (
        <Placer
          presets={[{ xAxis: 'inside-left', yAxis: 'middle' }]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
  ))
  .add('X axis inside right', () => (
        <Placer
          presets={[{ xAxis: 'inside-right', yAxis: 'middle' }]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
  ))
  .add('Auto position left top corner', () => (
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
  ))
  .add('Auto position right top corner', () => (
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
  ))
  .add('Auto position left bottom corner', () => (
        <Placer
          presets={[
            { xAxis: 'inside-right', yAxis: 'outside-bottom' },
            { xAxis: 'inside-left', yAxis: 'outside-top' },
          ]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
  ))
  .add('Auto position right bottom corner', () => (
        <Placer
          presets={[
            { xAxis: 'inside-left', yAxis: 'outside-bottom' },
            { xAxis: 'inside-right', yAxis: 'outside-top' },
          ]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
  ))
  .add('Position with scroll', () => (
        <Placer
          presets={[
            { xAxis: 'inside-left', yAxis: 'outside-bottom' },
            { xAxis: 'inside-right', yAxis: 'outside-top' },
          ]}
          content={<Placeable />}
        >
          <Target />
        </Placer>
  ))
  .add('Position with inner scroll', () => (
      <div style={{ margin: 0, width: 300, height: 200, overflow: 'scroll' }}>
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
  ))
  .add('Custom offsets', () => (
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
  ))
  .add('Custom position', () => (
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
  ));
