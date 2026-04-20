import { useEffect, useState } from 'react';
import useWishlist from '../../services/local/wishlist';
import styles from './style.module.css';
import type Artwork from '../../interfaces/Responses/Artwork';
import GetArtworksArr from '../../services/api/getArtworksArr';
import ArtGrid from '../../components/artGrid';
import ArtCard from '../../components/artCard';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const limit = 10; // 10 cartas por carga
  const { wishlist, addItem } = useWishlist();

  const [artworks, setArtworks] = useState<(Artwork | undefined)[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [more, setMore] = useState(true);

  // Buscar los artículos
  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      const sliced = wishlist.slice(offset, offset + limit).map((i) => i.id);
      const result = await GetArtworksArr(sliced);

      // Cargarlos
      setArtworks((prev) => {
        const existingIds = new Set(prev.map((a) => a?.id));
        const filtered = result.filter((a) => !existingIds.has(a?.id));
        return [...prev, ...filtered];
      });

      // Liberar
      setMore(wishlist.length > offset + limit);
      setLoading(false);
    };

    fetchArtworks();
  }, [offset]);

  return (
    <section className="page-container">
      <h1 className="page-title">Wishlist</h1>

      {wishlist.length === 0 && !loading ? (
        <p className={styles.status}>
          The Wishlist is empty.
          <br />
          <Link to="/search" className="btn-gold">
            Search for your new favorite artwork!
          </Link>
        </p>
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
                  setOffset((prev) => Math.min(prev + limit, wishlist.length))
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
