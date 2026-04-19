import { useState, useEffect } from 'react';

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (val: T | ((val: T) => T)) => void] {
  // Leer localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error('Error leyendo localStorage', error);
      return initialValue;
    }
  });

  // Setear localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      setStoredValue((prev) => {
        const valueToStore = value instanceof Function ? value(prev) : value;

        localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    } catch (error) {
      console.error('Error escribiendo en localStorage', error);
    }
  };

  // Sincronizar entre pestañas
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          setStoredValue(
            event.newValue ? (JSON.parse(event.newValue) as T) : initialValue
          );
        } catch (error) {
          console.error('Error sincronizando localStorage', error);
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, initialValue]);

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
