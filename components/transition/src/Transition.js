import React from 'react';
import raf from 'raf';
import PropTypes from 'prop-types';

export class Transition extends React.Component {
  static propTypes = {
    // enterStyle: PropTypes.object,
    // leaveStyle: PropTypes.object,
    // enterTimeout: PropTypes.number,
    // leaveTimeout: PropTypes.number,
    // updateTimeout: PropTypes.number,
    // timeout: PropTypes.number,
    // isImmediatelyUpdate: PropTypes.bool,
    // updateDelay: PropTypes.number,
    // onWillEnter: PropTypes.func,
    // onDidEnter: PropTypes.func,
    // onWillLeave: PropTypes.func,
    // onDidLeave: PropTypes.func
  };

  static defaultProps = {
    timeout: 250,
    updateDelay: 50,
    isImmediatelyUpdate: true,
  };

  constructor(props, context) {
    super(props, context);
    this._isInit = true;
    this.state = props.children
      ? new AppearState(props, false)
      : new InitEmptyState();
    this._setEnterState = this._setEnterState.bind(this);

    setTimeout(() => (this._isInit = false), this._getTimeout('enter'));
  }

  componentDidMount() {
    const props = this.props;
    this._isMounted = true;

    if (props.children) {
      props.onWillEnter && props.onWillEnter();
      setTimeout(() => this._setEnterState(true), 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this._isRemoving ||
      nextProps.children === undefined ||
      nextProps.children === this.state.children
    ) {
      return;
    }

    const nextChildren = nextProps.children || null;

    if (!this.state.children && nextChildren) {
      this._showNewChildren(nextProps);
      return;
    }

    if (this.state.children && !nextChildren) {
      this._removeOldChildren();

      return;
    }

    if (this.state.children !== nextChildren && !this._isInit) {
      this.props.isImmediatelyUpdate
        ? this._showNewChildren(
            { ...nextProps, children: nextChildren },
            true,
            true,
          )
        : this._removeOldChildren(() => {
            setTimeout(
              () =>
                this._showNewChildren(
                  { ...nextProps, children: nextChildren },
                  true,
                ),
              nextProps.updateDelay,
            );
          }, true);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _showNewChildren(props, isUpdate, isSkipAppear) {
    if (this._isMounted && isSkipAppear) {
      this.setState({
        children: props.children || null,
      });

      return;
    }

    props.onWillEnter && props.onWillEnter();

    raf(
      () =>
        this._isMounted &&
        this.setState(new AppearState(props, isUpdate), this._setEnterState),
    );
  }

  _setEnterState() {
    const { onDidEnter } = this.props;

    raf(() => {
      this._isMounted &&
        this.setState(
          {
            isEnter: true,
            isAppear: false,
          },
          () => {
            const timeout = this._getTimeout('enter');
            setTimeout(
              () =>
                this._isMounted &&
                this.setState(
                  { isDidEnter: true },
                  () => onDidEnter && onDidEnter(),
                ),
              timeout,
            );
          },
        );
    });
  }

  _removeOldChildren(callback: () => void, isUpdate: boolean) {
    let props = this.props;

    if (!this._isMounted || this._isRemoving) {
      return;
    }

    const removeState = {
      isEnter: false,
      isLeave: true,
      isUpdate: !!isUpdate,
      isDidEnter: false,
    };

    const timeout = this._getTimeout('leave');

    this._isRemoving = true;

    props.onWillLeave && props.onWillLeave();

    raf(() => {
      if (this._isMounted) {
        this.setState(removeState, () => {
          setTimeout(() => {
            raf(
              () =>
                this._isMounted &&
                this.setState(
                  {
                    children: null,
                    isEnter: false,
                    isLeave: false,
                    isUpdate: !!isUpdate,
                  },
                  () => {
                    this._isRemoving = false;
                    props.onDidLeave && props.onDidLeave();
                    callback && callback();
                  },
                ),
            );
          }, timeout);
        });
      }
    });
  }

  _getTimeout(stage: 'enter' | 'leave'): number {
    const props = this.props;

    return props[`${stage}Timeout`] === undefined
      ? props.timeout
      : props[`${stage}Timeout`];
  }

  _getRenderProps() {
    const { isEnter, isLeave, isUpdate, isAppear, isInit } = this.state;
    return { isEnter, isLeave, isUpdate, isAppear, isInit };
  }

  render() {
    if (!this.state.children) {
      return null;
    }

    return this.state.children({
      ...this._getRenderProps(),
      isInit: this._isInit,
    });
  }
}

function AppearState(props, isUpdate, isInit) {
  this.children = props.children;
  this.isEnter = false;
  this.isAppear = true;
  this.isLeave = false;
  this.isUpdate = !!isUpdate;
  this.isDidEnter = false;
}

function InitEmptyState() {
  this.children = null;
  this.isEnter = false;
  this.isLeave = true;
  this.isAppear = false;
  this.isUpdate = false;
  this.isDidEnter = false;
}

export default Transition;
