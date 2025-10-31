import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * useAsync standardizes async lifecycle management.
 * Pass an async function; it returns { execute, loading, value, error } with safe cancellation.
 */
export function useAsync(asyncFunction, deps = []) {
  const mountedRef = useRef(true);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(undefined);
  const [error, setError] = useState(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const result = await asyncFunction(...args);
        if (mountedRef.current) {
          setValue(result);
        }
        return result;
      } catch (err) {
        if (mountedRef.current) {
          setError(err);
        }
        throw err;
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );

  return { execute, loading, value, error, setValue, setError };
}
