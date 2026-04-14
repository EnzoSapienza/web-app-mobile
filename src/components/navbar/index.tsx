import { Link } from 'react-router-dom';
import styles from './style.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/wishlist">Wishlist</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
      </ul>
    </nav>
  );
}