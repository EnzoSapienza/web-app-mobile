import type Props from '../props';
import styles from './styles.module.css';

export default function ArtworkDescription({ artwork }: Props) {
  console.log(artwork);
  if (artwork?.description || artwork?.short_description)
    return (
      <section className={styles.artworkDescription}>
        {artwork?.description || artwork?.short_description || ''}
      </section>
    );
  else return <></>;
}
