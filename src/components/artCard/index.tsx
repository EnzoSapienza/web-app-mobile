import { Link } from 'react-router-dom';
import type Artwork from '../../interfaces/Responses/Artwork';
import styles from './style.module.css';

interface Props {
  art?: Artwork;
}

export default function ArtCard({ art }: Props) {
  if (!art) return <></>;

  const displayTitle = art.title || 'Untitled Masterpiece';
  const displayArtist = art.artist_display || 'Unknown Artist';

  return (
    <Link to={`/details/${art.id}`} className={styles.cardLink}>
      <article className={styles.card}>
        <figure className={styles.figure}>
          <img src={art.imageUrl} alt={displayTitle} className={styles.image} />
        </figure>
        <div className={styles.info}>
          <h3 className={styles.artTitle}>{displayTitle}</h3>
          <p className={styles.artistName}>{displayArtist}</p>
        </div>
      </article>
    </Link>
  );
}
