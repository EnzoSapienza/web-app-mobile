import Map from '../../components/map/map';
import styles from './style.module.css';

export default function Contact() {
  return (
    <section className={styles.contactPage}>
      <h1 className="page-title">About us</h1>
      <article className={styles.contactArticle}>
        <h2 className="page-subtitle">What is The Luminal</h2>
        <div>
          <p>
            This page is a project made as part of our Software Engineering at
            the{' '}
            <a className="inline-anchor" href="www.unaj.edu.ar">
              Arturo Jauretche National University
            </a>
          </p>
        </div>
      </article>
      <article className={styles.contactArticle}>
        <h2 className="page-subtitle">Creators</h2>
        <div className={styles.flexContainer}>
          <div>Daisy Lizbeth Torrico</div>
          <div>Enzo Lihuel Sapienza</div>
        </div>
      </article>
      <article className={styles.contactArticle}>
        <h2 className="page-subtitle">Our contact info</h2>
        <div className={styles.flexContainer}>
          <div>
            <a
              className="inline-anchor"
              href="https://www.facebook.com/Unajoficial/"
            >
              Facebook
            </a>
          </div>
          <div>
            <a
              className="inline-anchor"
              href="https://www.instagram.com/unaj_oficial/"
            >
              Instagram
            </a>
          </div>
          <div>
            <a className="inline-anchor" href="https://x.com/unaj_oficial">
              Twitter
            </a>
          </div>
        </div>
      </article>
      <article className={styles.mapSection}>
        <h2 className="page-subtitle">Our office</h2>
        <Map />
      </article>
    </section>
  );
}
