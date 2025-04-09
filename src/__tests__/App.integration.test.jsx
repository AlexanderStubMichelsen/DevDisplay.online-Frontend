// ✅ Mock config.js before importing anything that depends on it
// Must be at the top of the test file
jest.mock('../config.js', () => ({
    default: {
      API_URL: 'http://localhost:5019', // 👈 Whatever you use locally
    },
  }));
  
  
  import React from 'react';
  import { render, screen, fireEvent, waitFor } from '@testing-library/react';
  import { MemoryRouter } from 'react-router-dom';
  import App from '../App';
  import apiFacade from '../util/api/UserFacade';
  
  describe('App integration: Sign Up flow', () => {
    const mockSetIsLoggedIn = jest.fn();
  
    beforeEach(() => {
      sessionStorage.clear();
      jest.clearAllMocks(); // clear mocks for getConfig, login, etc.
    });
  
    test('can sign up and log in successfully', async () => {
      // ✅ Mock API responses
      jest.spyOn(apiFacade, 'signUp').mockResolvedValue();
      jest.spyOn(apiFacade, 'login').mockResolvedValue({
        token: 'fake-token',
        userDto: {
          id: 1,
          email: 'test@example.com',
          name: 'Test User',
        },
      });
  
      render(
        <MemoryRouter>
          <App isLoggedIn={false} setIsLoggedIn={mockSetIsLoggedIn} />
        </MemoryRouter>
      );
  
      // ✅ Open signup modal
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
  
      // ✅ Fill and submit form
      fireEvent.change(screen.getByPlaceholderText(/name/i), {
        target: { value: 'Test User' },
      });
      fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByPlaceholderText(/password/i), {
        target: { value: 'secret' },
      });
      fireEvent.click(screen.getAllByRole('button', { name: /^sign up$/i })[1]);
  
      // ✅ Wait for login to complete and session storage to be set
      await waitFor(() => {
        expect(apiFacade.signUp).toHaveBeenCalled();
        expect(apiFacade.login).toHaveBeenCalled();
        expect(mockSetIsLoggedIn).toHaveBeenCalledWith(true);
      });
  
      // ✅ Validate session data
      const data = JSON.parse(sessionStorage.getItem('loginData'));
      expect(data.email).toBe('test@example.com');
    });
  });
  