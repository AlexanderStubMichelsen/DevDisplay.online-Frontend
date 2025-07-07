import { vi, describe, test, beforeEach, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// ✅ Mock config.js before importing App
vi.mock('../config.js', () => ({
  getConfig: async () => ({
    API_URL: 'http://localhost:5019',
  }),
}));

import App from '../App';

describe('App component', () => {
  const mockSetIsLoggedIn = vi.fn();

  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  test('renders navbar brand name', () => {
    render(
      <MemoryRouter>
        <App isLoggedIn={false} setIsLoggedIn={mockSetIsLoggedIn} />
      </MemoryRouter>
    );

    // ✅ Use getAllByText and check the first one (navbar)
    expect(screen.getAllByText(/DevDisplay/i)[0]).toBeInTheDocument();
  });

  test('renders Sign Up button if not logged in', () => {
    render(
      <MemoryRouter>
        <App isLoggedIn={false} setIsLoggedIn={mockSetIsLoggedIn} />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  test('does not render Sign Up button if logged in', () => {
    sessionStorage.setItem('isLoggedIn', 'true');

    render(
      <MemoryRouter>
        <App isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
      </MemoryRouter>
    );

    expect(screen.queryByRole('button', { name: /sign up/i })).not.toBeInTheDocument();
  });

  test('opens and closes signup modal', () => {
    render(
      <MemoryRouter>
        <App isLoggedIn={false} setIsLoggedIn={mockSetIsLoggedIn} />
      </MemoryRouter>
    );

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();

    // Optional: check form fields exist
    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

    // ✅ Close modal - target the span with class "close"
    fireEvent.click(screen.getByText('×'));
    expect(screen.queryByRole('heading', { name: /sign up/i })).not.toBeInTheDocument();
  });
});
