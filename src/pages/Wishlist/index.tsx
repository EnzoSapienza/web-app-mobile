import { useEffect, useState } from 'react';
import useWishlist from '../../services/local/wishlist';
import styles from './style.module.css';
import ArtGrid from '../../components/artGrid';
import ArtCard from '../../components/artCard';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import type WishlistItem from '../../interfaces/LocalItems/WishlistItem';

export default function Wishlist() {
  const limit = 10; // 10 cartas por carga
  const { wishlist } = useWishlist();

  // Routing
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [artworks, setArtworks] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(Number(searchParams.get('offset')) || 0);
  const [more, setMore] = useState(true);

  // Buscar los artículos
  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      const sliced = wishlist.slice(0, offset + limit);

      // Cargarlos
      setArtworks((prev) => {
        const existingIds = new Set(prev.map((a) => a.id));
        const filtered = sliced.filter((a) => !existingIds.has(a.id));
        return [...prev, ...filtered];
      });

      // Liberar
      setMore(wishlist.length > offset + limit);
      searchParams.set('offset', String(offset));
      setSearchParams(searchParams, { replace: true, state: location.state });
      setLoading(false);
    };

    fetchArtworks();
  }, [offset, wishlist]);

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
