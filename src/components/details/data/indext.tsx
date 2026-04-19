import type Artwork from '../../../interfaces/Responses/Artwork';
import type Props from '../props';
import styles from './styles.module.css';

interface RowProps {
  fieldName: string;
  fieldContent: string | number | undefined;
}

const ArtworkDetailsRow = ({ fieldName, fieldContent }: RowProps) => {
  return (
    <section className={styles.artworkDetailsRow}>
      <div className={styles.artworkDetailsCol}>{fieldName}</div>
      <div className={styles.artworkDetailsCol}>{fieldContent}</div>
    </section>
  );
};

type ArtworkFieldConfig = {
  key: keyof Artwork;
  label: string;
};

const artworkFields: ArtworkFieldConfig[] = [
  { key: 'title', label: 'Title' },
  { key: 'artist_display', label: 'Artist' },
  { key: 'main_reference_number', label: 'Main Reference Number' },
  { key: 'date_qualifier_title', label: 'Date Qualifier Title' },
  { key: 'date_display', label: 'Creation Date' },
  { key: 'place_of_origin', label: 'Place of Origin' },
  { key: 'credit_line', label: 'Acquisition Credit Line' },
];

export default function ArtworkData({ artwork }: Props) {
  return (
    <section className={styles.artworkDetails}>
      {artworkFields.map(({ key, label }) => {
        const value = artwork?.[key];

        if (!value || (typeof value !== 'string' && typeof value !== 'number'))
          return null;

        const content: number | string = value;

        return (
          <ArtworkDetailsRow
            key={key}
            fieldName={label}
            fieldContent={content}
          />
        );
      })}
    </section>
  );
}
