import useLocalStorage from './localStorage';
import type WishlistItem from '../../interfaces/LocalItems/WishlistItem';

const KEY = 'wishlist';

export default function useWishlist() {
  const [wishlist, setWishlist] = useLocalStorage<WishlistItem[]>(KEY, []);

  const addItem = (item: WishlistItem) => {
    if (!wishlist.find((i) => i.id === item.id)) {
      setWishlist([...wishlist, item]);
    }
  };

  const removeItem = (id: number) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: number) => wishlist.some((item) => item.id === id);

  return { wishlist, addItem, removeItem, isInWishlist };
}
