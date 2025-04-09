import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

// ✅ Mock the UserFacade module
jest.mock("../util/api/UserFacade.js", () => ({
  signUp: jest.fn(),
  login: jest.fn(),
}));

import apiFacade from "../util/api/UserFacade.js";

describe("App integration: Sign Up flow", () => {
  beforeEach(() => {
    // ✅ Clear sessionStorage and mocks
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  test("can sign up and log in successfully", async () => {
    // ✅ Mock API responses
    apiFacade.signUp.mockResolvedValue(); // signup doesn't return anything
    apiFacade.login.mockResolvedValue({
      token: "fake-token",
      userDto: {
        id: 1,
        name: "Test User",
        email: "test@example.com",
      },
    });

    // ✅ Mock setIsLoggedIn
    const mockSetIsLoggedIn = jest.fn();

    render(
      <BrowserRouter>
        <App isLoggedIn={false} setIsLoggedIn={mockSetIsLoggedIn} />
      </BrowserRouter>
    );

    // ✅ Open modal
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    // ✅ Fill in form
    fireEvent.change(screen.getByPlaceholderText(/name/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "secret" },
    });

    // ✅ Find the modal and the correct "Sign Up" button inside it
    const modal = screen.getByRole("dialog");
    const submitButton = within(modal).getByRole("button", { name: /^sign up$/i });

    // ✅ Submit the form
    fireEvent.click(submitButton);

    // ✅ Wait for mocked API calls
    await waitFor(() => {
      expect(apiFacade.signUp).toHaveBeenCalled();
      expect(apiFacade.login).toHaveBeenCalled();
      expect(mockSetIsLoggedIn).toHaveBeenCalledWith(true);
    });

    // ✅ Check sessionStorage was updated
    const saved = JSON.parse(sessionStorage.getItem("loginData"));
    expect(saved.email).toBe("test@example.com");
    expect(saved.name).toBe("Test User");
    expect(saved.token).toBe("fake-token");
  });
});
