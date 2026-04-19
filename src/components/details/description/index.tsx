import styles from './styles.module.css';
import DOMPurify from 'dompurify';

interface Props {
  title: string | undefined;
  text: string | undefined;
}

export default function ArtworkDescription({ title, text }: Props) {
  if (text) {
    const rawHtml = text || '';

    const cleanHtml = DOMPurify.sanitize(rawHtml, {
      ALLOWED_TAGS: ['p', 'em', 'a', 'br', 'strong'],
      ALLOWED_ATTR: ['href', 'target', 'rel'],
    });

    return (
      <section>
        {title && <h2 className="page-subtitle">{title}</h2>}
        <div
          className={styles.artworkDescription}
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />
      </section>
    );
  } else return <></>;
}
