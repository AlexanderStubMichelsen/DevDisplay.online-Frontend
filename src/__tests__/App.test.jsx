import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App component', () => {
  const mockSetIsLoggedIn = jest.fn();

  beforeEach(() => {
    sessionStorage.clear();
    mockSetIsLoggedIn.mockClear();
  });

  test('renders navbar brand name', () => {
    render(
      <MemoryRouter>
        <App isLoggedIn={false} setIsLoggedIn={mockSetIsLoggedIn} />
      </MemoryRouter>
    );

    expect(screen.getByText(/maskinen/i)).toBeInTheDocument();
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

    // Close modal
    fireEvent.click(screen.getByRole('button', { name: /×/i }));
    expect(screen.queryByRole('heading', { name: /sign up/i })).not.toBeInTheDocument();
  });
});
