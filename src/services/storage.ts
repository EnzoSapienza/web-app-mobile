import type WishlistItem from '../interfaces/LocalItems/WishlistItem';
const WISHLIST_KEY = 'art_app_wishlist';
const HISTORY_KEY = 'art_app_history';

// --- LÓGICA DE FAVORITOS (RF5 y RF6) ---
export const saveToWishlist = (item: WishlistItem) => {
    const current = getWishlist();
  // Evita duplicados y agrega el nuevo
    const updated = [item, ...current.filter(i => i.id !== item.id)];
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
};

export const getWishlist = (): WishlistItem[] => {
    const data = localStorage.getItem(WISHLIST_KEY);
    return data ? JSON.parse(data) : [];
};

export const removeFromWishlist = (id: number) => {
    const filtered = getWishlist().filter(item => item.id !== id);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(filtered));
};

// --- LÓGICA DE HISTORIAL (RF6) ---
export const addToHistory = (artwork: { id: number; title: string; artist: string; image: string }) => {
    const current = getHistory();
    // RF6: Orden cronológico inverso (el más reciente primero)
    const updated = [artwork, ...current.filter((i: { id: number }) => i.id !== artwork.id)].slice(0, 20);    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
};

export const getHistory = () => {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
};