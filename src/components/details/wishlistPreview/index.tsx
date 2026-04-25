import styles from './style.module.css';

interface WishlistPreviewProps {
    priority?: number;
    label?: string;
    note?: string;
}

export default function WishlistPreview({
    priority,
    label,
    note,
}: WishlistPreviewProps) {
    return (
        <section className={styles.container}>
            <h3 className={styles.header}>Personal Appraisal</h3>

            {priority !== undefined && (
                <div className={styles.ratingRow}>
                    <span className={styles.noteTitle}>Priority</span>
                    <span className={styles.stars}>
                        {'★'.repeat(priority)}{'☆'.repeat(5 - priority)}
                    </span>
                </div>
            )}

            {label && (
                <div className={styles.ratingRow}>
                    <span className={styles.noteTitle}>Curation Label</span>
                    <span className={styles.labelBadge}>{label}</span>
                </div>
            )}

            {note && (
                <div className={styles.noteRow}>
                    <span className={styles.noteTitle}>Internal Critique</span>
                    <p className={styles.noteText}>"{note}"</p>
                </div>
            )}
        </section>
    );
}