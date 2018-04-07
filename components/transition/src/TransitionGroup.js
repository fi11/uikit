import React from 'react';

export class TransitionGroup extends React.Component {
  state = { lockIdx: null };
  _lockIdx = null;

  static defaultProps = {
    delay: 150,
  };

  render() {
    return React.Children.map(this.props.children, (c, idx) => {
      const { lockIdx } = this.state;

      const children = c.props.children;
      return React.cloneElement(c, {
        key: idx,
        onWillEnter: () => {
          const { onWillEnter } = c.props;
          this._lockIdx = idx;

          onWillEnter && onWillEnter();
        },
        onDidEnter: () => {
          const { onDidEnter } = c.props;

          this.setState({
            lockIdx: this._lockIdx,
          });

          onDidEnter && onDidEnter();
        },
        onDidLeave: () => {
          const { onDidLeave } = c.props;
          this._lockIdx = null;

          setTimeout(() => {
            this.setState({
              lockIdx: null,
            });
          }, this.props.delay || 50);

          onDidLeave && onDidLeave();
        },
        children:
          (lockIdx === null || idx === lockIdx) && !!children ? children : null,
      });
    });
  }
}
