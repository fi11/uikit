import React from 'react';

export default ({ value, onChange, onBlur, onFocus, errorText, disabled }) => (
  <div style={{ marginBottom: 9 }} >
    <input value={value} onChange={({ target }) => onChange(target.value)} onBlur={onBlur} onFocus={onFocus} disabled={disabled} />
    <span style={{ color: 'red', marginLeft: 8 }}>{errorText}</span>
  </div>
);