import useLocalStorage from './localStorage';
import type WishlistItem from '../../interfaces/LocalItems/WishlistItem';

const KEY = 'wishlist';

export default function useWishlist() {
  const [wishlist, setWishlist] = useLocalStorage<WishlistItem[]>(KEY, []);

  const addToList = (item: WishlistItem | undefined) => {
    if (!item) return;

    item.priority = Math.floor(item.priority);
    item.priority = Math.min(5, item.priority);
    item.priority = Math.max(0, item.priority);

    setWishlist((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [
        ...prev,
        {
          id: item.id,
          title: item.title,
          artist_display: item.artist_display,
          imageUrl: item.imageUrl,
          priority: item.priority,
          label: item.label,
          note: item?.note,
        },
      ].sort((a, b) => b.priority - a.priority);
    });
  };

  const removeItem = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: number) => wishlist.some((item) => item.id === id);

  return { wishlist, addToList, removeItem, isInWishlist };
}
