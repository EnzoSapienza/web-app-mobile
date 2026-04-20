import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

export function useGlobalFocus() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const targetId = searchParams.get('focus');
    if (!targetId) return;

    let observer: MutationObserver | null = null;

    const tryFocus = () => {
      const el = document.getElementById(targetId);

      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus?.();

        searchParams.delete('focus');
        setSearchParams(searchParams, { replace: true });

        observer?.disconnect();
        return true;
      }

      return false;
    };

    // Primer intento
    if (tryFocus()) return;

    // Segundo intento
    observer = new MutationObserver(() => {
      tryFocus();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer?.disconnect();
    };
  }, [location.key]);
}
