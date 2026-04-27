import { useNavigate, useParams } from 'react-router-dom';
import type Artwork from '../../interfaces/Responses/Artwork';
import GetArtwork from '../../services/api/getArtwork';
import { useEffect, useState } from 'react';
import styles from './style.module.css';
import ArtworkImage from '../../components/details/image';
import ArtworkDescription from '../../components/details/description';
import ArtworkData from '../../components/details/data/indext';
import AccordionSection from '../../components/details/accordion';
import useHistory from '../../services/local/history';
import useWishlist from '../../services/local/wishlist';
import WishlistModal, {
  type WishlistFormData,
} from '../../components/details/WishListModal';
import WishlistPreview from '../../components/details/wishlistPreview';

export default function Details() {
  const { id } = useParams();

  // Fetch
  const [artwork, setArtwork] = useState<Artwork>();
  const [isAvailable, setAvailable] = useState(true);

  useEffect(() => {
    const fetchArtwork = async () => {
      const data = await GetArtwork(Number(id));

      if (data) {
        setArtwork(data);
      } else {
        setAvailable(false);
      }
    };
    fetchArtwork();
  }, [id]);

  // Añadir al historial
  const { addItem } = useHistory();
  useEffect(() => {
    if (artwork) addItem(artwork);
  }, [addItem, artwork]);

  // Modal y Wishlist
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { wishlist, addToList, removeItem, isInWishlist } = useWishlist();
  const wishlistItem = artwork
    ? wishlist.find((item) => item.id === artwork.id)
    : null;

  // Volver atrás
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const handleOpenWishlist = () => {
    setIsModalOpen(true);
  };
  const handleCloseWishlist = () => {
    setIsModalOpen(false);
  };
  const handleSubmitWishlist = (formData: WishlistFormData) => {
    if (!artwork) return;

    // Validación
    if (!formData?.label || !formData?.priority) return;

    addToList({
      id: artwork.id,
      title: artwork.title,
      artist_display: artwork.artist_display || '',
      imageUrl: artwork.imageUrl || '',
      priority: formData.priority,
      label: formData.label,
      note: formData.note || undefined,
    });

    setIsModalOpen(false);
  };
  const isAlreadyInWishlist = artwork ? isInWishlist(artwork.id) : false;

  return (
    <article className={styles.detailsPage}>
      <h1
        className={`page-title-detail ${isAvailable ? styles.visible : styles.hidden}`}
      >
        {artwork?.title}
      </h1>
      <button
        className={`btn-silver ${isAvailable ? styles.visible : styles.hidden}`}
        onClick={goBack}
      >
        <span className={styles.textIcon}>←</span>
        Back
      </button>

      {/*En caso de Offline*/}
      <div
        className={`${styles.offlineMessage} ${!isAvailable ? '' : styles.hidden}`}
      >
        <h1 className="page-title">Resource not available</h1>
      </div>

      {/*Contenido principal*/}
      <div
        className={`${styles.contentWrapper} ${isAvailable ? '' : styles.hidden}`}
      >
        <section className={styles.imageSection}>
          <ArtworkImage artwork={artwork} />
          {!isAlreadyInWishlist ? (
            <button
              className={[
                'btn-gold',
                styles.wishlistBtn,
                isAvailable ? styles.visible : styles.hidden,
              ].join(' ')}
              onClick={handleOpenWishlist}
              title="Add to Wishlist"
            >
              Add to Wishlist
            </button>
          ) : (
            <button
              className={[
                'btn-silver',
                styles.wishlistBtn,
                isAvailable ? styles.visible : styles.hidden,
              ].join(' ')}
              onClick={() => removeItem(artwork!.id)}
              title="Remove from Wishlist"
            >
              Remove from Wishlist
            </button>
          )}
        </section>

        <section className={styles.infoSection}>
          <ArtworkDescription
            text={artwork?.description || artwork?.short_description}
          />
          <ArtworkData artwork={artwork} />

          <AccordionSection
            title="Publication History"
            content={artwork?.publication_history}
          />
          <AccordionSection
            title="Exhibition History"
            content={artwork?.exhibition_history}
          />
          <AccordionSection
            title="Acquisition History"
            content={artwork?.provenance_text}
          />

          {isAlreadyInWishlist && (
            <WishlistPreview
              priority={wishlistItem?.priority}
              label={wishlistItem?.label}
              note={wishlistItem?.note}
            />
          )}
        </section>
      </div>

      <WishlistModal
        isOpen={isModalOpen}
        onClose={handleCloseWishlist}
        onSubmit={handleSubmitWishlist}
        artwork={artwork}
      />
    </article>
  );
}
