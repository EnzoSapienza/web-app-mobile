/* eslint-disable react-hooks/rules-of-hooks */
import { Link } from 'react-router-dom';
import styles from './style.module.css';
import { useState } from 'react';

interface Props {
  art?: {
    id: number;
    title: string;
    imageUrl: string;
    artist_display: string;
  };
}

export default function ArtCard({ art }: Props) {
  if (!art || !art.imageUrl) return <></>;

  const displayTitle = art.title || 'Untitled Masterpiece';
  const displayArtist = art.artist_display || 'Unknown Artist';

  const [errorCount, setErrorCount] = useState(0);
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    if (errorCount === 0) {
      console.log('primer error');
      e.currentTarget.src = art.imageUrl.replace(/\/full\/\d+,/, '/full/full');
      setErrorCount(1);
    } else if (errorCount === 1) {
      console.log('segundo error');
      e.currentTarget.src = 'public/placeholder.png';
      setErrorCount(2);
    }
  };

  return (
    <Link to={`/details/${art.id}`} className={styles.cardLink}>
      <article className={styles.card}>
        <figure className={styles.figure}>
          <img
            src={art.imageUrl}
            alt={displayTitle}
            className={styles.image}
            onError={handleImageError}
          />
        </figure>
        <div className={styles.info}>
          <h3 className={styles.artTitle}>{displayTitle}</h3>
          <p className={styles.artistName}>{displayArtist}</p>
        </div>
      </article>
    </Link>
  );
}
