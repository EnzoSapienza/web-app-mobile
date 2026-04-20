import { useEffect, useState } from 'react';
import ArtGrid from '../../components/artGrid';
import styles from './style.module.css';
import ArtCard from '../../components/artCard';
import useHistory from '../../services/local/history';
import type HistoryItem from '../../interfaces/LocalItems/HistoryItem';
import { useLocation, useSearchParams } from 'react-router-dom';

export default function History() {
  const limit = 10; // 10 cartas por carga

  // Ruteo
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const { history } = useHistory();

  const [artworks, setArtworks] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(Number(searchParams.get('offset')) || 0);
  const [more, setMore] = useState(true);
  console.log(searchParams);

  // Buscar los artículos
  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      const sliced = history.slice(0, offset + limit);

      // Cargarlos
      setArtworks((prev) => {
        const existingIds = new Set(prev.map((a) => a?.id));
        const filtered = sliced.filter((a) => !existingIds.has(a?.id));
        return [...prev, ...filtered];
      });

      // Liberar
      setMore(history.length > offset + limit);
      searchParams.set('offset', String(offset));
      setSearchParams(searchParams, { replace: true, state: location.state });
      setLoading(false);
    };

    fetchArtworks();
  }, [offset, history]);

  return (
    <section className="page-container">
      <h1 className="page-title">Historial</h1>

      {history.length === 0 && !loading ? (
        <p className={styles.status}>The History is empty.</p>
      ) : (
        <>
          {loading && artworks.length === 0 && (
            <p className={styles.status}>Exploring archives...</p>
          )}

          <ArtGrid>
            {artworks.map((art) => (
              <ArtCard key={art?.id} art={art} />
            ))}
          </ArtGrid>

          {loading && artworks.length > 0 && (
            <p className={styles.status}>Loading more...</p>
          )}

          {!loading && (
            <div className={styles.buttonContainer}>
              <button
                disabled={!more}
                className="btn-gold"
                onClick={() =>
                  setOffset((prev) => Math.min(prev + limit, history.length))
                }
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
