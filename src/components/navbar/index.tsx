import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
      <Link to="/details">Details</Link>
      <Link to="/wishlist">Wishlist</Link>
      <Link to="/history">History</Link>
    </>
  );
}
