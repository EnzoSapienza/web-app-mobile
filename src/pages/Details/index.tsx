import { useParams } from 'react-router-dom';
import type Artwork from '../../interfaces/Responses/Artwork';
import GetArtwork from '../../services/api/getArtwork';
import { useEffect, useState } from 'react';
import styles from './style.module.css';
import ArtworkImage from '../../components/details/image';
import ArtworkDescription from '../../components/details/description';
import ArtworkGenericDescription from '../../components/details/description/generic.tsx';
import ArtworkData from '../../components/details/data/indext';

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

  return (
    <section className={styles.detailsPage}>
      <h1 className={styles.artworkTitle}>{artwork?.title}</h1>

      <ArtworkImage artwork={artwork} />

      <ArtworkDescription artwork={artwork} />

      <ArtworkData artwork={artwork} />

      <ArtworkGenericDescription
        title={'Historial de publicación'}
        text={artwork?.publication_history}
      />

      <ArtworkGenericDescription
        title={'Historial de Exhibición'}
        text={artwork?.exhibition_history}
      />

      <ArtworkGenericDescription
        title={'Historial de adquisiciones'}
        text={artwork?.provenance_text}
      />
    </section>
  );
}
