import { useState } from 'react';
import styles from './WishlistModal.module.css';
import type Artwork from '../../../interfaces/Responses/Artwork';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: WishlistFormData) => void;
  artwork?: Artwork;
}

export interface WishlistFormData {
  priority: number;
  label: string;
  note: string;
}

export default function WishlistModal({
  isOpen,
  onClose,
  onSubmit,
  artwork,
}: WishlistModalProps) {
  const [priority, setPriority] = useState(3);
  const [hoverRating, setHoverRating] = useState(0);
  const [label, setLabel] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!label.trim()) {
      setError('Please provide a curation label.');
      return;
    }
    setError('');

    onSubmit({
      priority,
      label: label.trim(),
      note: note.trim(),
    });

    // Reset form
    setPriority(3);
    setLabel('');
    setNote('');
    setHoverRating(0);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setError('');
      onClose();
    }
  };

  if (!isOpen || !artwork) return null;

  return (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <form
        className={styles.sheet}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.handle}></div>

        <h2 className={styles.title}>Add to Favorites</h2>
        <p className={styles.subtitle}>
          {artwork.artist_display ? `${artwork.artist_display} • ` : ''}
          {artwork.title}
        </p>

        {/* Stars */}
        <div className={styles.section}>
          <label className={styles.fieldLabel}>PRIORITY RATING</label>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={
                  star <= (hoverRating || priority)
                    ? styles.starActive
                    : styles.star
                }
                onClick={() => setPriority(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                {star <= (hoverRating || priority) ? '★' : '☆'}
              </span>
            ))}
          </div>
        </div>

        {/* Curation Label */}
        <div className={styles.section}>
          <label htmlFor="label" className={styles.fieldLabel}>
            CURATION LABEL *
            <span className={styles.charCount}>{label.length}/25</span>
          </label>
          <input
            id="label"
            type="text"
            placeholder="e.g. Modernist Highlights 2024"
            value={label}
            onChange={(e) => {
              const newValue = e.target.value;
              if (newValue.length <= 25) {
                setLabel(newValue);
                if (error) setError('');
              }
            }}
            className={`${styles.input} ${error ? styles.inputError : ''}`}
          />
          {error && <span className={styles.errorText}>{error}</span>}
        </div>

        {/* Note */}
        <div className={styles.section}>
          <label htmlFor="note" className={styles.fieldLabel}>
            INTERNAL CRITIQUE
            <span style={{ float: 'right', fontWeight: 'normal' }}>
              {note.length}/150
            </span>
          </label>
          <textarea
            id="note"
            placeholder="Notes on lighting..."
            value={note}
            onChange={(e) => {
              const newValue = e.target.value;
              if (newValue.length <= 150) {
                setNote(newValue);
              }
            }}
            className={styles.textarea}
          />
        </div>

        <button type="submit" className="btn-gold" style={{ width: '100%' }}>
          SAVE TO WISHLIST
        </button>
      </form>
    </div>
  );
}
