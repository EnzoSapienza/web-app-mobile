import useLocalStorage from './localStorage';
import type HistoryItem from '../../interfaces/LocalItems/HistoryItem';

const KEY = 'history';

export default function useHistory() {
  const [history, setHistory] = useLocalStorage<HistoryItem[]>(KEY, []);

  const addItem = (item: HistoryItem | undefined) => {
    if (!item) return;

    setHistory((prev) => {
      if (prev[0]?.id === item.id) return prev;

      const filtered: HistoryItem[] = prev.filter((i) => i.id != item.id);

      return [
        {
          id: item.id,
          title: item.title,
          artist_display: item.artist_display,
          imageUrl: item.imageUrl,
        },
        ...filtered,
      ];
    });
  };

  const removeItem = (id: number) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return { history, addItem, removeItem };
}
