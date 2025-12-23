/**
 * API Client - Edge Functions Ready
 */

import { API_BASE_URL, REQUEST_TIMEOUT } from './config';

export interface ApiResponse<T> {
  data: T;
  error: null;
  status: number;
}

export interface ApiError {
  data: null;
  error: { message: string; code: string };
  status: number;
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

export async function apiGet<T>(endpoint: string): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    return res.ok 
      ? { data, error: null, status: res.status }
      : { data: null, error: { message: data.message, code: 'ERROR' }, status: res.status };
  } catch {
    return { data: null, error: { message: 'Network error', code: 'NETWORK_ERROR' }, status: 0 };
  }
}

export async function apiPost<T>(endpoint: string, body?: unknown): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();
    return res.ok 
      ? { data, error: null, status: res.status }
      : { data: null, error: { message: data.message, code: 'ERROR' }, status: res.status };
  } catch {
    return { data: null, error: { message: 'Network error', code: 'NETWORK_ERROR' }, status: 0 };
  }
}
