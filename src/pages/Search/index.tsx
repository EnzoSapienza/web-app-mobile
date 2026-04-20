import { useState, useEffect } from 'react';
import GetArtworksSearch from '../../services/api/getArtworksSearch';
import ArtCard from '../../components/artCard';
import type Artwork from '../../interfaces/Responses/Artwork';
import styles from './style.module.css';
import ArtGrid from '../../components/artGrid';

export default function Search() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [origin, setOrigin] = useState('');
  const [style, setStyle] = useState('');
  const [page, setPage] = useState(1);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const types = ['Painting', 'Sculpture', 'Textiles', 'Furniture'];
  const origins = ['France', 'Japan', 'Mexico', 'United States', 'Italy'];
  const stylesList = ['Impressionism', 'Modernism', 'Surrealism', 'Baroque'];

  useEffect(() => {
    let cancelled: boolean = false;

    const fetchArtworks = async () => {
      setLoading(true);
      const results = await GetArtworksSearch({
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
          />
        </div>

        <div className={styles.filtersRow}>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={styles.select}
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
          >
            <option value="">Style ▾</option>
            {stylesList.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-gold" disabled={loading}>
          {loading ? 'Searching...' : 'Apply Filters'}
        </button>
      </form>

      <ArtGrid>
        {loading ? (
          <p className={styles.status}>Exploring archives...</p>
        ) : artworks.length > 0 ? (
          artworks.map((art) => <ArtCard key={art.id} art={art} />)
        ) : (
          <p className={styles.status}>No results found.</p>
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
            disabled={artworks.length < 10}
          >
            Next →
          </button>
        </div>
      )}
    </section>
  );
}
