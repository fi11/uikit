import React from 'react';
import { findDOMNode } from 'react-dom';

const createPortalDomNode = zIndex => {
  if (typeof document === 'undefined') {
    return null;
  }

  const domNode = document.createElement('div');
  domNode.style.position = 'absolute';
  domNode.style.top = '0px';
  domNode.style.left = '0px';
  domNode.style.zIndex = zIndex;

  return domNode;
};

const { Provider, Consumer } = React.createContext({
  createPortalDOMNode(zIndex) {
    const domNode = createPortalDomNode(zIndex);

    document.body.appendChild(domNode);
    return domNode;
  },
});

export const PlacerContextConsumer = Consumer;

export class PlacerContext extends React.Component {
  createPortalDOMNode = zIndex => {
    const domNode = createPortalDomNode(zIndex);

    const selfDOMNode = findDOMNode(this);

    if (selfDOMNode) {
      const parentDOMNode = findDOMNode(this).parentNode;
      if (parentDOMNode) {
        const originalPosition = parentDOMNode.style.position;
        parentDOMNode.style.position = 'relative';
        parentDOMNode.appendChild(domNode);

        const originRemove = domNode.remove.bind(domNode);

        domNode.remove = () => {
          parentDOMNode.style.position = originalPosition;
          originRemove();
        };

        return domNode;
      }
    }

    document.body.appendChild(domNode);
    return domNode;
  };

  render() {
    return <Provider value={this}>{this.props.children}</Provider>;
  }
}
