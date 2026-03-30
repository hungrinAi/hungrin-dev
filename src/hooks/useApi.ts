import { useState, useEffect } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(apiFunc: () => Promise<T>, dependencies: any[] = []) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    setState(prev => ({ ...prev, loading: true }));

    apiFunc()
      .then(data => {
        if (isMounted) setState({ data, loading: false, error: null });
      })
      .catch(err => {
        if (isMounted) setState({ data: null, loading: false, error: err.message });
      });

    return () => { isMounted = false; };
  }, dependencies);

  return state;
}
