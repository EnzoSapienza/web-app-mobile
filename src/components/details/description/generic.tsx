import styles from './styles.module.css';

interface StringProp {
  title: string;
  text: string | undefined;
}

export default function ArtworkGenericDescription({ title, text }: StringProp) {
  if (text)
    return (
      <section className={styles.artworkDescription}>
        <h2 className={styles.artworkSectionTitle}>{title}</h2>
        {text}
      </section>
    );
  else return <></>;
}
