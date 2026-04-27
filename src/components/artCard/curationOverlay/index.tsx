import { useLocation } from 'react-router-dom';
import styles from './style.module.css';
import useWishlist from '../../../services/local/wishlist';
import trashIcon from '../../../assets/trash.svg';
import saveIcon from '../../../assets/save.svg';

interface OverlayProps {
  artId: number;
}

export function CurationBookmark({ artId }: OverlayProps) {
  const { isInWishlist } = useWishlist();
  if (!isInWishlist(artId)) return null;

  return (
    <div className={styles.bookmarkContainer} title="Saved">
      <img src={saveIcon} alt="Saved" className={styles.bookmarkIcon} /> 
    </div>
  );
}

export function CurationMetadata({ artId }: OverlayProps) {
  const { wishlist } = useWishlist();
  const location = useLocation();

  const isWishlistPage = location.pathname === '/wishlist';
  const saved = wishlist.find((item) => item.id === artId);

  if (!isWishlistPage || !saved) return null;

  return (
    <div className={styles.metadataFooter}>
      <div className={styles.starsRow}>
        <span className={styles.starsText}>{'★'.repeat(saved.priority)}</span>
        <span className={styles.inactiveStars}>{'★'.repeat(5 - saved.priority)}</span>
      </div>
      {saved.label && (
        <span className={styles.tagPill}>{saved.label}</span>
      )}
    </div>
  );
}

export function CurationActions({ artId, onRemove }: { artId: number, onRemove?: (id: number) => void }) {
  const handleRemoveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRemove) onRemove(artId);
  };

  if (!onRemove) return null;

  return (
    <button className={styles.removeBtn} onClick={handleRemoveClick} title="remove">
      <img src={trashIcon} alt="trash" className={styles.trashIcon} />
    </button>
  );
}