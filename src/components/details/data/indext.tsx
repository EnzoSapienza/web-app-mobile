import type Props from '../props';
import styles from './styles.module.css';

interface RowProps {
  fieldName: string;
  fieldContent: string | number | undefined;
}

const ArtworkDetailsRow = ({ fieldName, fieldContent }: RowProps) => {
  if (fieldContent)
    return (
      <section className={styles.artworkDetailsRow}>
        <div className={styles.artworkDetailsCol}>{fieldName}</div>
        <div className={styles.artworkDetailsCol}>{fieldContent}</div>
      </section>
    );
  else return <></>;
};

export default function ArtworkData({ artwork }: Props) {
  return (
    <section className={styles.artworkDetails}>
      <ArtworkDetailsRow fieldName="Título" fieldContent={artwork?.title} />
      <ArtworkDetailsRow
        fieldName="Descripción"
        fieldContent={artwork?.short_description || artwork?.description}
      />
      <ArtworkDetailsRow
        fieldName="Artista"
        fieldContent={artwork?.artist_display}
      />
      <ArtworkDetailsRow
        fieldName="Número de referencia primario"
        fieldContent={artwork?.main_reference_number}
      />
      <ArtworkDetailsRow
        fieldName="Título de fecha de calificación"
        fieldContent={artwork?.date_qualifier_title}
      />
      <ArtworkDetailsRow
        fieldName="Fecha de creación"
        fieldContent={artwork?.date_display}
      />
      <ArtworkDetailsRow
        fieldName="Lugar de origen"
        fieldContent={artwork?.place_of_origin}
      />
      <ArtworkDetailsRow
        fieldName="Créditos de adquisición"
        fieldContent={artwork?.credit_line}
      />
      <ArtworkDetailsRow
        fieldName="Historial de publicación"
        fieldContent={artwork?.publication_history}
      />
      <ArtworkDetailsRow
        fieldName="Historial de Exhibición"
        fieldContent={artwork?.exhibition_history}
      />
      <ArtworkDetailsRow
        fieldName="Adquisición 2"
        fieldContent={artwork?.provenance_text}
      />
    </section>
  );
}
