import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs';
import Popover from './index';
import StateProvider from '@uikit/state-provider';
import BaseTail from '@uikit/tail';

const xAxis = [
  { xAxis: 'outside-left' },
  { xAxis: 'inside-left' },
  { xAxis: 'middle' },
  { xAxis: 'inside-right' },
  { xAxis: 'outside-right' },
];

const yAxis = [
  { yAxis: 'outside-top' },
  { yAxis: 'inside-top' },
  { yAxis: 'middle' },
  { yAxis: 'inside-bottom' },
  { yAxis: 'outside-bottom' },
];

const xAxisWithTail = [
  { xAxis: 'outside-left', xTail: 'right' },
  { xAxis: 'outside-right', xTail: 'left' },
  { xAxis: 'inside-left', xTail: '' },
  { xAxis: 'inside-right', xTail: '' },
  { xAxis: 'middle', xTail: '' },
];

const yAxisWithTail = [
  { yAxis: 'inside-top' },
  { yAxis: 'inside-bottom' },
  { yAxis: 'middle' },
  { yAxis: 'outside-top', direction: 'bottom' },
  { yAxis: 'outside-bottom', direction: 'top' },
];

const offsetForTail = [0, 14, -14, 100, -100, null];

const Popup = ({ actions }) => (
  <div
    style={{
      padding: 10,
      background: '#fff',
      boxShadow: '0 6px 24px rgba(114, 125, 129, .75)',
    }}
  >
    <span>PopoverContent</span>
    {'\u00a0'}
    <a
      href={'/'}
      onClick={e => {
        e.preventDefault();
        actions.hide();
      }}
    >
      close
    </a>
  </div>
);

const Tail = ({ direction }) => (
  <BaseTail
    size={14}
    shadow="0px 0px 6px rgba(114, 125, 129, .75)"
    direction={direction}
  />
);

const Settings = ({ children }) => (
  <StateProvider
    state={{
      offsetX: 0,
      offsetY: 14,
      tail: {
        direction: 'top',
      },

      xAxis: 'inside-left',
      yAxis: 'outside-bottom',
    }}
  >
    {(state, setState) => (
      <div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ margin: '0 40px 40px 0' }}>
            <h4>xAxis</h4>
            {xAxisWithTail.map(preset => (
              <div>
                <label>
                  <input
                    type="radio"
                    name="xAxis"
                    onClick={() =>
                      setState(
                        Object.assign(
                          { xAxis: preset.xAxis },
                          preset.direction && {
                            tail: { direction: preset.direction },
                          },
                        ),
                      )
                    }
                  />
                  {preset.xAxis}
                </label>
              </div>
            ))}
          </div>
          <div style={{ margin: '0 40px 10px 0' }}>
            <h4>yAxis</h4>
            {yAxisWithTail.map(preset => (
              <div>
                <label>
                  <input
                    type="radio"
                    name="yAxis"
                    onClick={() =>
                      setState(
                        Object.assign(
                          { yAxis: preset.yAxis },
                          preset.direction && {
                            tail: { direction: preset.direction },
                          },
                        ),
                      )
                    }
                  />
                  {preset.yAxis}
                </label>
              </div>
            ))}
          </div>
          <div style={{ margin: '0 40px 10px 0' }}>
            <h4>X Offset</h4>
            {offsetForTail.map(value => (
              <div>
                <label>
                  <input
                    type="radio"
                    name="xOffset"
                    onClick={() => setState(Object.assign({ offsetX: value }))}
                  />
                  {value === null ? 'null' : value}
                </label>
              </div>
            ))}
          </div>
          <div style={{ margin: '0 40px 10px 0' }}>
            <h4>Y Offset</h4>
            {offsetForTail.map(value => (
              <div>
                <label>
                  <input
                    type="radio"
                    name="yOffset"
                    onClick={() => setState(Object.assign({ offsetY: value }))}
                  />
                  {value === null ? 'null' : value}
                </label>
              </div>
            ))}
          </div>
          <div style={{ margin: '0 40px 10px 0' }}>
            <h4>X Tail offset</h4>
            {offsetForTail.map(value => (
              <div>
                <label>
                  <input
                    type="radio"
                    name="xTailOffset"
                    onClick={() =>
                      setState(Object.assign({ xTailOffset: value }))
                    }
                  />
                  {value === null ? 'null' : value}
                </label>
              </div>
            ))}
          </div>
          <div style={{ margin: '0 40px 10px 0' }}>
            <h4>Y Tail offset</h4>
            {offsetForTail.map(value => (
              <div>
                <label>
                  <input
                    type="radio"
                    name="yTailOffset"
                    onClick={() =>
                      setState(Object.assign({ yTailOffset: value }))
                    }
                  />
                  {value === null ? 'null' : value}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <h4>Tail to middle</h4>
          <label>
            <input
              type="checkbox"
              checked={state.isToMiddle}
              onClick={() => setState({ isToMiddle: !state.isToMiddle })}
            />
          </label>
        </div>
        <div style={{ marginBottom: 40 }}>
          <h4>AutoClosable</h4>
          <label>
            <input
              type="checkbox"
              checked={state.isAutoClosable}
              onClick={() =>
                setState({ isAutoClosable: !state.isAutoClosable })
              }
            />
          </label>
        </div>
        {children(state)}
      </div>
    )}
  </StateProvider>
);

storiesOf('Components/Popover', module)
  .addDecorator(withKnobs)
  .add('main', () => (
    <div style={{ padding: 60 }}>
      <Settings>
        {(state, setState) => (
          <Popover
            isAutoClosable={state.isAutoClosable}
            tailSize={14}
            presets={
              state.xAxis && state.yAxis
                ? [
                    {
                      xAxis: state.xAxis,
                      yAxis: state.yAxis,
                      offsetX: state.offsetX,
                      offsetY: state.offsetY,
                      tail: {
                        isToMiddle: state.isToMiddle,
                        offsetX: state.xTailOffset,
                        offsetY: state.yTailOffset,
                      },
                    },
                  ]
                : null
            }
            renderPopup={({
              isLeave,
              isAppear,
              tail: { direction, style },
              actions,
            }) => (
              <div
                style={{
                  position: 'relative',
                  transition: 'all 0.5s ease-out',
                  opacity: isLeave || isAppear ? 0 : 1,
                }}
              >
                <Popup actions={actions} />
                {direction && (
                  <div style={style}>
                    <Tail direction={direction} />
                  </div>
                )}
              </div>
            )}
            render={({ actions }) => (
              <button onClick={() => actions.toggle()}>Click me</button>
            )}
          />
        )}
      </Settings>
    </div>
  ));
