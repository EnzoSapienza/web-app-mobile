import { useState } from 'react';
import styles from './style.module.css';

interface Props {
  title: string;
  content: string | undefined;
}

export default function AccordionSection({ title, content }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  if (!content) return null;

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
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}