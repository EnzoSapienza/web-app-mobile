import { useState } from 'react';
import styles from './style.module.css';
import DOMPurify from 'dompurify';

interface Props {
  title: string;
  content: string | undefined;
}

export default function AccordionSection({ title, content }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  if (!content) return null;

  const rawHtml = content || '';

  const cleanHtml = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: ['p', 'em', 'a', 'br', 'strong'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });

  return (
    <div className={styles.accordionItem}>
      <button
        className={styles.accordionHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.title}>{title}</span>
        <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && (
        <div className={styles.accordionContent}>
          <p>{cleanHtml}</p>
        </div>
      )}
    </div>
  );
}
