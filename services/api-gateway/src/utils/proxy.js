import { servicesConfig } from '../config/services.js';

const toUrlWithQuery = (baseUrl, path, query = {}) => {
  const url = new URL(`${baseUrl}${path}`);

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }
    url.searchParams.append(key, String(value));
  });

  return url.toString();
};

export const proxyRequest = async (req, res, { serviceBaseUrl, path, method, body }) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), servicesConfig.timeoutMs);

  try {
    const upstreamResponse = await fetch(toUrlWithQuery(serviceBaseUrl, path, req.query), {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const contentType = upstreamResponse.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const payload = isJson ? await upstreamResponse.json() : await upstreamResponse.text();

    if (isJson) {
      return res.status(upstreamResponse.status).json(payload);
    }

    return res.status(upstreamResponse.status).send(payload);
  } catch (error) {
    if (error.name === 'AbortError') {
      return res.status(504).json({
        message: 'Upstream service timeout',
      });
    }

    return res.status(503).json({
      message: 'Upstream service unavailable',
      detail: error.message,
    });
  } finally {
    clearTimeout(timeout);
  }
};
