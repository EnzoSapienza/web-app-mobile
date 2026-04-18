import { useState, useEffect } from 'react';
import type Props from '../props';
import styles from './styles.module.css';

export default function ArtworkImage({ artwork }: Props) {
  // Para la miniatura hasta que carga la imagen
  const [loaded, setLoaded] = useState(false);

  // Para el lightbox
  const [isOpen, setOpen] = useState(false);

  // Para evitar el scroll
  useEffect(() => {
    if (isOpen) document.body.classList.add(styles.noScroll);
    else document.body.classList.remove(styles.noScroll);

    return () => document.body.classList.remove(styles.noScroll);
  }, [isOpen]);

  if (artwork?.image_id)
    return (
      <section
        className={[
          styles.imageContainer,
          loaded ? styles.imageLoaded : '',
          isOpen ? styles.fullImage : '',
        ].join(' ')}
        style={{ backgroundImage: `url(${artwork?.thumbnail?.lqip})` }}
      >
        <img
          className={styles.image}
          src={artwork?.imageUrl}
          alt={artwork?.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onClick={() => setOpen(!isOpen)}
        />
      </section>
    );
  else return <></>;
}
