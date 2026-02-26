const KEY = 'pharmacie-favoris';

export const getFavorites = (): string[] => {
    if (typeof window === 'undefined') return [];
    try {
        return JSON.parse(localStorage.getItem(KEY) || '[]');
    } catch {
        return [];
    }
};

export const isFavorite = (phone: string): boolean => getFavorites().includes(phone);

export const toggleFavorite = (phone: string): boolean => {
    const favs = getFavorites();
    const next = favs.includes(phone)
        ? favs.filter((f) => f !== phone)
        : [...favs, phone];
    localStorage.setItem(KEY, JSON.stringify(next));
    return next.includes(phone);
};
