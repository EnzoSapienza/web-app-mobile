import { useParams } from 'react-router-dom';
import type Artwork from '../../interfaces/Responses/Artwork';
import GetArtwork from '../../services/api/getArtwork';
import { useEffect, useState } from 'react';
import styles from './style.module.css';

export default function Details() {
  const { id } = useParams();

  // TODO: Hacer mensaje de error
  // Situaciones: ID no valido, Imagen no encontrada

  // Fetch
  const [artwork, setArtwork] = useState<Artwork>();
  useEffect(() => {
    const fetchArtwork = async () => setArtwork(await GetArtwork(Number(id)));
    fetchArtwork();
  }, [id]);

  // Para la miniatura hasta que carga la imagen
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <h1>{artwork?.title}</h1>
      <div
        className={`${styles.image_container} ${loaded ? styles.image_loaded : ''}`}
        style={{ backgroundImage: `url(${artwork?.thumbnail?.lqip})` }}
      >
        <img
          className={styles.image}
          src={artwork?.imageUrl}
          alt={artwork?.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </>
  );
}
