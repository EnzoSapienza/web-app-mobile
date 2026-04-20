import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type Artwork from '../../interfaces/Responses/Artwork';
import GetArtwork from '../../services/api/getArtwork';
import { useEffect, useState } from 'react';
import styles from './style.module.css';
import ArtworkImage from '../../components/details/image';
import ArtworkDescription from '../../components/details/description';
import ArtworkData from '../../components/details/data/indext';
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
  }, [artwork]);

  // Volver atrás
  const navigate = useNavigate();
  const location = useLocation();
  const goBack = () => {
    const fromPage = location.state?.from;

    if (!fromPage) navigate('/');

    const params = new URLSearchParams(fromPage?.search || '');
    params.delete('focus');
    params.append('focus', 'art-card-' + id);

    navigate(`${fromPage?.pathname}?${params}`);
  };

  return (
    <section className={styles.detailsPage}>
      <h1 className="page-title">{artwork?.title}</h1>

      <button className="btn-silver" onClick={goBack}>
        Atrás
      </button>

      <ArtworkImage artwork={artwork} />

      <ArtworkDescription
        title=""
        text={artwork?.description || artwork?.short_description}
      />

      <ArtworkData artwork={artwork} />

      <ArtworkDescription
        title={'Publication History'}
        text={artwork?.publication_history}
      />

      <ArtworkDescription
        title={'Exhibition History'}
        text={artwork?.exhibition_history}
      />

      <ArtworkDescription
        title={'Acquisition History'}
        text={artwork?.provenance_text}
      />
    </section>
  );
}
