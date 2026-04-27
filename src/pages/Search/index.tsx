import { useState, useEffect } from 'react';
import GetArtworksSearch from '../../services/api/getArtworksSearch';
import ArtCard from '../../components/artCard';
import type Artwork from '../../interfaces/Responses/Artwork';
import styles from './style.module.css';
import ArtGrid from '../../components/artGrid';
import { useLocation, useSearchParams } from 'react-router-dom';
import useNetworkStatus from '../../services/pwa/useNetworkStatus';
import useIsPWA from '../../services/pwa/useIsPwa';

export default function Search() {
  // Manejo de ruteo
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // Validar conexión de PWA
  const isOnline = useNetworkStatus();
  const isPWA = useIsPWA();

  // Cargarlos a los SearchParam
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [origin, setOrigin] = useState(searchParams.get('origin') || '');
  const [style, setStyle] = useState(searchParams.get('style') || '');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Campos
  const types = [
    'painting',
    'sculpture',
    'textile',
    'furniture',
    'ceramics',
    'jewelry',
    'photography',
  ];
  const origins = [
    'France',
    'Japan',
    'Mexico',
    'United States',
    'Italy',
    'China',
    'Egypt',
    'Greece',
    'India',
    'Spain',
    'Netherlands',
    'Germany',
    'Russia',
    'Brazil',
    'South Korea',
    'Iran',
  ];
  const stylesList = [
    'Impressionism',
    'Modernism',
    'Surrealism',
    'Post-Impressionism',
    'Japanese (culture or style)',
    'Renaissance',
    'Baroque',
    'Cubism',
    'Abstract Expressionism',
    'Realism',
    'Neoclassicism',
  ];
  const updateParams = async () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('query', query);
    newParams.set('origin', origin);
    newParams.set('type', type);
    newParams.set('style', style);
    newParams.set('page', String(page));
    setSearchParams(newParams, { replace: true, state: location.state });
  };

  // Buscar siguiente página
  useEffect(() => {
    let cancelled: boolean = false;
    updateParams();

    const fetchArtworks = async () => {
      setLoading(true);
      const results: Artwork[] = await GetArtworksSearch({
        q: query,
        type,
        origin,
        style,
        page,
      });

      if (!cancelled) {
        setArtworks(results);
        setLoading(false);
        if (submitted) window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    fetchArtworks();

    return () => {
      cancelled = true;
    };
  }, [page, submitted]);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setPage(1);
    setSubmitted((prev) => !prev);
  };

  return (
    <section className="page-container">
      <section className="page-header">
        <h1 className="page-title">Search</h1>
        <p className="page-subtitle">Explore world-class masterpieces.</p>
      </section>

      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={styles.searchBarWrapper}>
          <span className={styles.searchIcon}>⚲</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by keyword..."
            className={styles.searchInput}
            disabled={isPWA && !isOnline}
          />
        </div>

        <div className={styles.filtersRow}>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={styles.select}
            disabled={isPWA && !isOnline}
          >
            <option value="">Category ▾</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className={styles.select}
            disabled={isPWA && !isOnline}
          >
            <option value="">Origin ▾</option>
            {origins.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className={styles.select}
            disabled={isPWA && !isOnline}
          >
            <option value="">Style ▾</option>
            {stylesList.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="btn-gold"
          disabled={loading || (isPWA && !isOnline)}
        >
          {loading ? 'Searching...' : 'Apply Filters'}
        </button>
      </form>

      <ArtGrid>
        {loading ? (
          <p className={styles.status}>Exploring archives...</p>
        ) : artworks.length > 0 ? (
          artworks.map((art) => <ArtCard key={art.id} art={art} />)
        ) : !isPWA || isOnline ? (
          <p className={styles.status}>No results found.</p>
        ) : (
          <p className={styles.status}>This feature needs to be online.</p>
        )}
      </ArtGrid>

      {/* PAGINACIÓN(10 elementos) */}
      {!loading && artworks.length > 0 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            ← Previous
          </button>
          <span className={styles.pageNumber}>Page {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= 100 || artworks.length < 10}
          >
            Next →
          </button>
        </div>
      )}
    </section>
  );
}
