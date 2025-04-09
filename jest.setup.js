import '@testing-library/jest-dom';

// jest.setup.js
jest.mock('./src/config.js', () => ({
    default: {
      API_URL: 'http://localhost:5019'
    }
  }));
  