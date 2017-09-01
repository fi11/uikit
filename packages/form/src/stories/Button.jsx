import React from 'react';

export default ({ title, ...props }) => (
  <button {...props}>{title}</button>
);