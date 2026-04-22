import { useNavigate, useParams } from 'react-router-dom';
import type Artwork from '../../interfaces/Responses/Artwork';
import GetArtwork from '../../services/api/getArtwork';
import { useEffect, useState } from 'react';
import styles from './style.module.css';
import ArtworkImage from '../../components/details/image';
import ArtworkDescription from '../../components/details/description';
import ArtworkData from '../../components/details/data/indext';
import AccordionSection from '../../components/details/accordion';
import useHistory from '../../services/local/history';

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

  // Añadir al historial
  const { addItem } = useHistory();
  useEffect(() => {
    addItem(artwork);
  }, [addItem, artwork]);

  // Volver atrás
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const handleOpenWishlist = () => {
    console.log('Abriendo formulario para añadir a favoritos...');
    alert('¡Pronto: Formulario de preferencias!');
  };

  return (
    <main className={styles.detailsPage}>
      <h1 className="page-title">{artwork?.title}</h1>

      <button className="btn-silver" onClick={goBack}>
        <span className={styles.textIcon}>←</span>
        Back
      </button>

      <div className={styles.contentWrapper}>
        <section className={styles.imageSection}>
          <ArtworkImage artwork={artwork} />
          <button className="btn-gold" onClick={handleOpenWishlist}>
            <span className={styles.textIcon}>❤</span>
            Add to favorites
          </button>
        </section>

        <section className={styles.infoSection}>
          <ArtworkDescription
            text={artwork?.description || artwork?.short_description}
          />
          <ArtworkData artwork={artwork} />

          <AccordionSection
            title="Publication History"
            content={artwork?.publication_history}
          />
          <AccordionSection
            title="Exhibition History"
            content={artwork?.exhibition_history}
          />
          <AccordionSection
            title="Acquisition History"
            content={artwork?.provenance_text}
          />
        </section>
      </div>
    </main>
  );
}
