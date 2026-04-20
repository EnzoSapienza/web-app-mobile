import useLocalStorage from './localStorage';
import type HistoryItem from '../../interfaces/LocalItems/HistoryItem';

const KEY = 'history';

export default function useHistory() {
  const [history, setHistory] = useLocalStorage<HistoryItem[]>(KEY, []);

  const addItem = (item: HistoryItem) => {
    const cleanItem = { ...item, artwork: undefined };

    setHistory((prev) => {
      if (prev[0]?.id === cleanItem.id) return prev;

      const filtered: HistoryItem[] = prev.filter((i) => i.id != cleanItem.id);
      return [cleanItem, ...filtered];
    });
  };

  const removeItem = (id: number) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return { history, addItem, removeItem };
}
