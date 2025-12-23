/**
 * Mock API Service
 * 
 * This service provides mock data with simulated network delay.
 * Replace with real API calls when Edge Functions are deployed.
 */

import { MOCK_DELAY } from './config';
import { ApiResult } from './client';

// Simulate network delay
export const delay = (ms: number = MOCK_DELAY): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

// Create successful mock response
export const mockSuccess = <T>(data: T, status: number = 200): ApiResult<T> => ({
  data,
  error: null,
  status,
});

// Create error mock response
export const mockError = (
  message: string,
  code: string = 'ERROR',
  status: number = 400
): ApiResult<never> => ({
  data: null,
  error: { message, code },
  status,
});

// Flag to use mock data (set to false when using real API)
export const USE_MOCK = true;

/**
 * Mock API wrapper
 * Wraps mock data with delay and response structure
 */
export async function mockApi<T>(
  mockData: T | (() => T | Promise<T>)
): Promise<ApiResult<T>> {
  await delay();
  
  try {
    const data = typeof mockData === 'function' 
      ? await (mockData as () => T | Promise<T>)()
      : mockData;
    return mockSuccess(data);
  } catch (error) {
    return mockError((error as Error).message, 'MOCK_ERROR', 500);
  }
}

/**
 * Conditional API call
 * Uses mock data in development, real API in production
 */
export async function conditionalApi<T>(
  realApiCall: () => Promise<ApiResult<T>>,
  mockData: T | (() => T | Promise<T>)
): Promise<ApiResult<T>> {
  if (USE_MOCK) {
    return mockApi(mockData);
  }
  return realApiCall();
}
