//
// PUBLIC_INTERFACE
// getEnv returns normalized environment variables used by the app.
//
/**
 * Returns normalized environment variables used across the app.
 * - REACT_APP_DSP_API_BASE_URL: Optional. If empty or undefined, the app runs in mock mode.
 */
export function getEnv() {
  // CRA exposes env vars prefixed with REACT_APP_
  const baseUrl = (process.env.REACT_APP_DSP_API_BASE_URL || '').trim();

  return {
    DSP_API_BASE_URL: baseUrl,
    MOCK_MODE: baseUrl.length === 0,
  };
}

// PUBLIC_INTERFACE
export function isMockMode() {
  /** Returns true if the app should use mock data (no backend URL configured). */
  return getEnv().MOCK_MODE;
}

// PUBLIC_INTERFACE
export function getApiBaseUrl() {
  /** Returns the configured API base URL or empty string if not set. */
  return getEnv().DSP_API_BASE_URL;
}
