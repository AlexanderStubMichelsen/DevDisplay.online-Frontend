// src/test-utils.jsx
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export function renderWithRouter(ui, options) {
  return render(<MemoryRouter {...options}>{ui}</MemoryRouter>);
}
