import { useState } from 'react';

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (val: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error('Error leyendo localStorage', error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error leyendo localStorage', error);
    }
  };

  return [storedValue, setValue] as const;
}

/*
import { useLocalStorage } from './useLocalStorage';
import { HistoryItem } from './types';

export function useHistory() {
  const [history, setHistory] = useLocalStorage<HistoryItem[]>('history', []);

  const addOrUpdateItem = (item: HistoryItem) => {
    setHistory(prev => {
      const existingIndex = prev.findIndex(i => i.id === item.id);
      if (existingIndex >= 0) {
        const newList = [...prev];
        newList[existingIndex] = item; // actualizar
        return newList;
      } else {
        return [...prev, item];
      }
    });
  };

  return { history, addOrUpdateItem };
}

----------------

import { useWishlist } from './useWishlist';
import { useHistory } from './useHistory';
import { WishlistItem, HistoryItem } from './types';

const ItemCard = ({ item }: { item: WishlistItem }) => {
  const { addItem, removeItem, isInWishlist } = useWishlist();

  const handleClick = () => {
    if (isInWishlist(item.id)) {
      // Redirigir a la lista de deseos
      window.location.href = '/wishlist';
    } else {
      addItem(item);
    }
  };

  return (
    <div>
      <h3>{item.name}</h3>
      <button onClick={handleClick}>
        {isInWishlist(item.id) ? 'Ir a Wishlist' : 'Añadir a Wishlist'}
      </button>
    </div>
  );
};
*/
