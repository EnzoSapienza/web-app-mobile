import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import { useState } from 'react';
import placeholder from '../../assets/placeholder.png';
import { CurationBookmark, CurationMetadata, CurationActions } from './curationOverlay';

interface Props {
  art?: {
    id: number;
    title: string;
    imageUrl: string;
    artist_display: string;
  };
  onRemove?: (id: number) => void;
}

export default function ArtCard({ art, onRemove }: Props) {
  // Art data
  const displayTitle = art?.title || 'Untitled Masterpiece';
  const displayArtist = art?.artist_display || 'Unknown Artist';

  // Fallos de imagen (muy chica, no encontrada)
  const [errorCount, setErrorCount] = useState(0);

  // Routing
  const navigate = useNavigate();
  const location = useLocation();

  // Valor vacío
  if (!art || !art.imageUrl) return <></>;

  // En caso de fallo en la imagen
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    if (errorCount === 0) {
      console.log('primer error');
      e.currentTarget.src = art.imageUrl.replace(/\/full\/\d+,/, '/full/full');
      setErrorCount(1);
    } else if (errorCount === 1) {
      console.log('segundo error');
      e.currentTarget.src = placeholder;
      setErrorCount(2);
    }
  };

  // Ruteo para que al volver atrás se le haga focus
  const goToDetailed = async (e: React.MouseEvent) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault?.();

    await navigate(`${location.pathname}${location.search}`, {
      replace: true,
      state: { focusTo: art.id },
    });

    navigate(`/details/${art.id}`);
  };

  return (
    <Link
      onClick={goToDetailed}
      className={styles.cardLink}
      id={'art-card-' + art.id}
      to={`/details/${art.id}`}
    >
      <article className={styles.card}>
        <figure className={styles.figure}>
          <img
            src={art.imageUrl}
            alt={displayTitle}
            className={styles.image}
            onError={handleImageError}
          />
          <CurationBookmark artId={art.id} />
        </figure>
        <div className={styles.info}>
          <h3 className={styles.artTitle}>{displayTitle}</h3>
          <p className={styles.artistName}>{displayArtist}</p>
          <CurationMetadata artId={art.id} />
          <CurationActions artId={art.id} onRemove={onRemove} />
        </div>
      </article>
    </Link>
  );
}
