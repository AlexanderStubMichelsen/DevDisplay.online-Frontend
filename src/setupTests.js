import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock geolocation API
const mockGeolocation = {
  getCurrentPosition: vi.fn((success) => {
    // Mock successful position response
    success({
      coords: {
        latitude: 55.6761,
        longitude: 12.5683,
      }
    });
  }),
  watchPosition: vi.fn(),
  clearWatch: vi.fn(),
};

Object.defineProperty(global.navigator, 'geolocation', {
  value: mockGeolocation,
  writable: true,
});

// Mock import.meta.env for tests
global.importMeta = {
  env: {
    VITE_WEATHER_API_KEY: 'test-api-key'
  }
};