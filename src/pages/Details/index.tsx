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
import WishlistModal, { type WishlistFormData } from '../../components/details/WishListModal';

export default function Details() {
  const { id } = useParams();

  // TODO: Hacer mensaje de error
  // Situaciones: ID no valido, Imagen no encontrada

  // Fetch
  const [artwork, setArtwork] = useState<Artwork>();
  useEffect(() => {
    const fetchArtwork = async () => setArtwork(await GetArtwork(Number(id)));
    fetchArtwork();
  }, [id]);

  // Añadir al historial
  const { addItem } = useHistory();
  useEffect(() => {
    addItem(artwork);
  }, [addItem, artwork]);

  // Modal y Wishlist
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToList, isInWishlist } = useWishlist();

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
    <main className={styles.detailsPage}>
      <h1 className="page-title">{artwork?.title}</h1>

      <button className="btn-silver" onClick={goBack}>
        <span className={styles.textIcon}>←</span>
        Back
      </button>

      <div className={styles.contentWrapper}>
        <section className={styles.imageSection}>
          <ArtworkImage artwork={artwork} />
          <button
            className={['btn-gold', styles.wishlistBtn].join(' ')}
            onClick={handleOpenWishlist}
            disabled={isAlreadyInWishlist}
            title={isAlreadyInWishlist ? 'Already in Wishlist' : 'Add to Wishlist'}
          >
            <span className={styles.textIcon}>
              {isAlreadyInWishlist ? '♥' : '♡'}
            </span>
            {isAlreadyInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
          </button>
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
        </section>
      </div>
      <WishlistModal
        isOpen={isModalOpen}
        onClose={handleCloseWishlist}
        onSubmit={handleSubmitWishlist}
        artwork={artwork}
      />
    </main>
  );
}
