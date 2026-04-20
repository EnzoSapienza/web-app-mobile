import useLocalStorage from './localStorage';
import type WishlistItem from '../../interfaces/LocalItems/WishlistItem';

const KEY = 'wishlist';

export default function useWishlist() {
  const [wishlist, setWishlist] = useLocalStorage<WishlistItem[]>(KEY, []);

  const addToList = (item: WishlistItem | undefined) => {
    if (!item) return;

    setWishlist((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeItem = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: number) => wishlist.some((item) => item.id === id);

  return { wishlist, addToList, removeItem, isInWishlist };
}
