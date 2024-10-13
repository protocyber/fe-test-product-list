import React, { createContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesContextProps {
    favorites: Product[];
    addToFavorites: (product: Product) => void;
    removeFromFavorites: (productId: number) => void;
    isFavorite: (productId: number) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextProps>({
    favorites: [],
    addToFavorites: () => { },
    removeFromFavorites: () => { },
    isFavorite: () => false,
});

interface ProviderProps {
    children: ReactNode;
}

const FAVORITES_STORAGE_KEY = '@favorites_products';

export const FavoritesProvider: React.FC<ProviderProps> = ({ children }) => {
    const [favorites, setFavorites] = useState<Product[]>([]);

    // Load favorites from AsyncStorage when the app starts
    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
                if (storedFavorites) {
                    setFavorites(JSON.parse(storedFavorites));
                }
            } catch (error) {
                console.error('Failed to load favorites from storage', error);
            }
        };

        loadFavorites();
    }, []);

    // Save favorites to AsyncStorage whenever it changes
    useEffect(() => {
        const saveFavorites = async () => {
            try {
                await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
            } catch (error) {
                console.error('Failed to save favorites to storage', error);
            }
        };

        saveFavorites();
    }, [favorites]);

    const addToFavorites = (product: Product) => {
        setFavorites((prev) => {
            // Prevent duplicates
            if (!prev.find((item) => item.id === product.id)) {
                return [...prev, product];
            }
            return prev;
        });
    };

    const removeFromFavorites = (productId: number) => {
        setFavorites((prev) => prev.filter((product) => product.id !== productId));
    };

    const isFavorite = (productId: number) => {
        return favorites.some((product) => product.id === productId);
    };

    return (
        <FavoritesContext.Provider
            value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};
