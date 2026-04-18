import { useState } from 'react';
import type Props from '../props';
import styles from './styles.module.css';

export default function ArtworkImage({ artwork }: Props) {
  // Para la miniatura hasta que carga la imagen
  const [loaded, setLoaded] = useState(false);

  if (artwork?.image_id)
    return (
      <section
        className={`${styles.imageContainer} ${loaded ? styles.imageLoaded : ''}`}
        style={{ backgroundImage: `url(${artwork?.thumbnail?.lqip})` }}
      >
        <img
          className={styles.image}
          src={artwork?.imageUrl}
          alt={artwork?.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </section>
    );
  else return <></>;
}
