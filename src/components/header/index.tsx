import { Link } from 'react-router-dom';
import styles from './style.module.css';
import logo from '../../assets/logo.svg';
import useScrollDirection from '../../services/useScollDirection';
import useTheme from '../../services/local/useTheme';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header
      className={[
        styles.header,
        useScrollDirection() === 'down' ? styles.scrollDown : '',
      ].join(' ')}
    >
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="logo" />
      </Link>
      <nav className={styles.navGroup}>
        <button 
          onClick={toggleTheme} 
          className={styles.themeBtn} 
          title="Cambiar a modo oscuro/claro"
        >
          {theme === 'light' ? '☾' : '☀'}
        </button>
        <Link to="/contact" className={styles.contactBtn}>
          Contact
        </Link>
      </nav>
    </header>
  );
}
