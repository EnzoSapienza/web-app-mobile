import { Link } from 'react-router-dom';
import styles from './style.module.css';
import logo from '../../assets/logo.svg';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}><img src={logo} alt="logo" /></Link>
      <nav>
        <Link to="/contact" className={styles.contactBtn}>Contact</Link>
      </nav>
    </header>
  );
}