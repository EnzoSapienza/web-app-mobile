import { Link } from 'react-router-dom';
import styles from './style.module.css';
import logo from '../../../public/logo.svg';
import useScrollDirection from '../../services/useScollDirection';

export default function Header() {
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
      <nav>
        <Link to="/contact" className={styles.contactBtn}>
          Contact
        </Link>
      </nav>
    </header>
  );
}
