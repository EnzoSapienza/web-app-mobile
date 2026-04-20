import { useEffect, useState } from 'react';
import ArtGrid from '../../components/artGrid';
import styles from './style.module.css';
import ArtCard from '../../components/artCard';
import useHistory from '../../services/local/history';
import type HistoryItem from '../../interfaces/LocalItems/HistoryItem';

export default function History() {
  const limit = 10; // 10 cartas por carga
  const { history } = useHistory();

  const [artworks, setArtworks] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [more, setMore] = useState(true);

  // Buscar los artículos
  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      const sliced = history.slice(offset, offset + limit);

      // Cargarlos
      setArtworks((prev) => {
        const existingIds = new Set(prev.map((a) => a?.id));
        const filtered = sliced.filter((a) => !existingIds.has(a?.id));
        return [...prev, ...filtered];
      });

      // Liberar
      setMore(history.length > offset + limit);
      setLoading(false);
    };

    fetchArtworks();
  }, [offset]);

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
