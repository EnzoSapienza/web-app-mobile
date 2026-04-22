import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.css';
import DOMPurify from 'dompurify';

interface Props {
  text: string | undefined;
}

export default function ArtworkDescription({ text }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const checkOverflow = () => {
      setShowButton(el.scrollHeight > el.clientHeight);
    };
    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(el);

    return () => observer.disconnect();
  }, [text]);

  const cleanHtml = useMemo(
    () =>
      DOMPurify.sanitize(text ?? '', {
        ALLOWED_TAGS: ['p', 'em', 'a', 'br', 'strong'],
        ALLOWED_ATTR: ['href', 'target', 'rel'],
      }),
    [text]
  );

  if (!text) return <></>;
  return (
    <section>
      <div
        ref={ref}
        className={[
          styles.artworkDescription,
          isOpen ? '' : styles.folded,
        ].join(' ')}
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />
      {showButton && (
        <button className="btn-silver" onClick={() => setOpen((prev) => !prev)}>
          read more
        </button>
      )}
    </section>
  );
}
