import { APP_CONFIG } from '../config/env.js';

class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

const buildUrl = (path) => `${APP_CONFIG.apiGatewayUrl}${path}`;

const request = async (path, options = {}) => {
  let response;
  try {
    response = await fetch(buildUrl(path), {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
  } catch (error) {
    throw new ApiError(
      'No se pudo conectar al API Gateway. Verifica que este levantado y la URL base en VITE_API_GATEWAY_URL.',
      0,
      { originalError: error.message }
    );
  }

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    const message = payload?.message || `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, payload);
  }

  return payload;
};

export const httpClient = {
  get: (path) => request(path),
  post: (path, body) =>
    request(path, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  put: (path, body) =>
    request(path, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
};

export { ApiError };
