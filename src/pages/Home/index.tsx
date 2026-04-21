import { useEffect, useState } from 'react';
import GetArtworksSearch from '../../services/api/getArtworksSearch';
import type Artwork from '../../interfaces/Responses/Artwork';
import styles from './style.module.css';
import { Link } from 'react-router-dom';
import ArtCard from '../../components/artCard';
import ArtGrid from '../../components/artGrid';

export default function Home() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInitialArt = async () => {
      // Trae 4 obras para la bienvenida
      const data = await GetArtworksSearch({ page: 1, limit: 6 });
      setArtworks(data);
      setLoading(false);
    };
    loadInitialArt();
  }, []);

  if (loading)
    return <div className={styles.loading}>Loading Collection...</div>;

  return (
    <section className={styles.homeContainer}>
      <header className={styles.hero}>
        <h1 className="page-title">THE LUMINAL</h1>
        <Link to="/search" className="btn-gold">
          Explore Collection
        </Link>
      </header>

      <ArtGrid>
        {artworks.map((art) => (
          <ArtCard key={art.id} art={art} />
        ))}
      </ArtGrid>
    </section>
  );
}
