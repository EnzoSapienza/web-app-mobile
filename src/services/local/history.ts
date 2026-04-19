import useLocalStorage from './localStorage';
import type HistoryItem from '../../interfaces/LocalItems/HistoryItem';

const KEY = 'history';

export default function useWishlist() {
  const [history, setHistory] = useLocalStorage<HistoryItem[]>(KEY, []);

  const addItem = (item: HistoryItem) => {
    setHistory((prev) => {
      const filtered: HistoryItem[] = prev.filter((i) => i.id != item.id);
      return [item, ...filtered];
    });
  };

  const removeItem = (id: number) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return { history, addItem, removeItem };
}
