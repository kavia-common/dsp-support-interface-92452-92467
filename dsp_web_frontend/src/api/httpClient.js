/**
 * Simple fetch-based HTTP client with:
 * - JSON request/response handling
 * - Timeout via AbortController
 * - 2 retry attempts for GET requests on network-like failures/status 5xx
 * - Error normalization
 */

import { getApiBaseUrl } from '../utils/env';

// PUBLIC_INTERFACE
export class HttpError extends Error {
  /** Normalized HTTP error */
  constructor(message, { status, code, details, url, method } = {}) {
    super(message);
    this.name = 'HttpError';
    this.status = status || 0;
    this.code = code || 'HTTP_ERROR';
    this.details = details;
    this.url = url;
    this.method = method;
  }
}

// PUBLIC_INTERFACE
export async function httpFetch(path, options = {}) {
  /**
   * Fetch wrapper that prefixes base URL, handles JSON, timeouts, and retries (GET).
   * Params:
   *  - path: string (relative or absolute). If absolute (http), base URL is not prefixed.
   *  - options:
   *      method: HTTP method (default GET)
   *      headers: extra headers
   *      query: object to be serialized into URL query params
   *      body: object (will be JSON.stringified) or string/Blob/FormData
   *      timeoutMs: request timeout in ms (default 12000)
   *      retries: number of retries for GET (default 2)
   * Returns: parsed JSON if response has JSON content-type; otherwise text.
   * Throws: HttpError on non-2xx or network/timeout errors.
   */
  const {
    method = 'GET',
    headers = {},
    query,
    body,
    timeoutMs = 12000,
    retries = method.toUpperCase() === 'GET' ? 2 : 0,
    signal: externalSignal,
  } = options;

  let url = path;
  const isAbsolute = /^https?:\/\//i.test(path);
  if (!isAbsolute) {
    const base = getApiBaseUrl().replace(/\/+$/, '');
    const p = String(path || '').replace(/^\/+/, '');
    url = base ? `${base}/${p}` : `/${p}`;
  }

  // attach query params
  if (query && typeof query === 'object') {
    const usp = new URLSearchParams();
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined || v === null) continue;
      if (Array.isArray(v)) {
        v.forEach((vv) => usp.append(k, String(vv)));
      } else {
        usp.set(k, String(v));
      }
    }
    const sep = url.includes('?') ? '&' : '?';
    url = `${url}${usp.toString() ? sep + usp.toString() : ''}`;
  }

  const finalHeaders = new Headers(headers);
  const upper = method.toUpperCase();

  // configure body and content-type
  let reqBody = body;
  const isJsonBody =
    body && typeof body === 'object' && !(body instanceof FormData) && !(body instanceof Blob);
  if (isJsonBody) {
    if (!finalHeaders.has('Content-Type')) {
      finalHeaders.set('Content-Type', 'application/json');
    }
    reqBody = JSON.stringify(body);
  }

  const doFetch = async (attempt) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(new Error('Request timeout')), timeoutMs);
    const compositeSignal = externalSignal
      ? new AbortController().signal
      : controller.signal;

    // Wire external signal to abort controller if provided
    if (externalSignal) {
      externalSignal.addEventListener('abort', () => {
        controller.abort(externalSignal.reason || new Error('Aborted'));
      }, { once: true });
    }

    try {
      const res = await fetch(url, {
        method: upper,
        headers: finalHeaders,
        body: reqBody,
        signal: controller.signal,
        credentials: 'same-origin',
      });

      const contentType = res.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');

      if (!res.ok) {
        let errPayload = null;
        try {
          errPayload = isJson ? await res.json() : await res.text();
        } catch {
          // ignore parse errors
        }

        const message =
          (errPayload && (errPayload.message || errPayload.error)) ||
          `Request failed with status ${res.status}`;

        throw new HttpError(message, {
          status: res.status,
          code: 'HTTP_' + res.status,
          details: errPayload,
          url,
          method: upper,
        });
      }

      if (upper !== 'HEAD' && contentType) {
        if (isJson) {
          return await res.json();
        }
        return await res.text();
      }
      return null;
    } catch (e) {
      const transient =
        e.name === 'AbortError' ||
        e.message?.toLowerCase?.().includes('timeout') ||
        e.message?.toLowerCase?.().includes('network') ||
        e.message?.toLowerCase?.().includes('failed to fetch');

      if (retries > attempt && upper === 'GET' && transient) {
        const backoff = 200 * Math.pow(2, attempt);
        await new Promise((r) => setTimeout(r, backoff));
        return doFetch(attempt + 1);
      }

      if (e instanceof HttpError) {
        throw e;
      }

      throw new HttpError(e.message || 'Network error', {
        status: 0,
        code: 'NETWORK_ERROR',
        details: { original: String(e) },
        url,
        method: upper,
      });
    } finally {
      clearTimeout(timeout);
    }
  };

  return doFetch(0);
}
