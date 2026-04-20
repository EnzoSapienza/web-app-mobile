import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

export function useGlobalFocus() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(location.state);

  useEffect(() => {
    const id = location.state?.focusTo;
    if (!id) return;

    const interval = setInterval(() => {
      const el = document.getElementById('art-card-' + id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        el.focus?.();
        searchParams.delete('focusTo');
        setSearchParams(searchParams, { replace: true, state: location.state });
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [location, searchParams, setSearchParams]);
}
