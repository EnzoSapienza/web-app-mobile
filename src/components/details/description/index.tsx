import type Props from '../props';
import styles from './styles.module.css';
import DOMPurify from 'dompurify';

export default function ArtworkDescription({ artwork }: Props) {
  if (artwork?.description || artwork?.short_description) {
    const rawHtml = artwork?.description || artwork?.short_description || '';

    const cleanHtml = DOMPurify.sanitize(rawHtml, {
      ALLOWED_TAGS: ['p', 'em', 'a', 'br', 'strong'],
      ALLOWED_ATTR: ['href', 'target', 'rel'],
    });

    return (
      <section
        className={styles.artworkDescription}
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />
    );
  } else return <></>;
}
