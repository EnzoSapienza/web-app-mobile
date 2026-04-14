import { Link } from 'react-router-dom';
import styles from './style.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>THE LUMINAL</Link>
      <nav>
        <Link to="/contact" className={styles.contactBtn}>Contact</Link>
      </nav>
    </header>
  );
}