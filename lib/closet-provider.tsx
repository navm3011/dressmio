import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClothingItem, SavedOutfit, ClosetState, StorageConfig } from './types';

interface ClosetContextType extends ClosetState {
  addItem: (item: ClothingItem) => Promise<void>;
  updateItem: (id: string, updates: Partial<ClothingItem>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  saveOutfit: (outfit: SavedOutfit) => Promise<void>;
  deleteOutfit: (id: string) => Promise<void>;
  loadItems: () => Promise<void>;
  setStorageType: (type: 'local' | 'cloud') => Promise<void>;
  clearAllData: () => Promise<void>;
}

const ClosetContext = createContext<ClosetContextType | undefined>(undefined);

type ClosetAction =
  | { type: 'SET_ITEMS'; payload: ClothingItem[] }
  | { type: 'ADD_ITEM'; payload: ClothingItem }
  | { type: 'UPDATE_ITEM'; payload: { id: string; updates: Partial<ClothingItem> } }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'SET_OUTFITS'; payload: SavedOutfit[] }
  | { type: 'ADD_OUTFIT'; payload: SavedOutfit }
  | { type: 'DELETE_OUTFIT'; payload: string }
  | { type: 'SET_STORAGE'; payload: StorageConfig }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload?: string }
  | { type: 'CLEAR_ALL'; payload: void };

const initialState: ClosetState = {
  items: [],
  savedOutfits: [],
  storage: {
    type: 'local',
    syncInProgress: false,
  },
  loading: false,
};

function closetReducer(state: ClosetState, action: ClosetAction): ClosetState {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'ADD_ITEM':
      return { ...state, items: [action.payload, ...state.items] };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload.updates } : item
        ),
      };
    case 'DELETE_ITEM':
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };
    case 'SET_OUTFITS':
      return { ...state, savedOutfits: action.payload };
    case 'ADD_OUTFIT':
      return { ...state, savedOutfits: [action.payload, ...state.savedOutfits] };
    case 'DELETE_OUTFIT':
      return {
        ...state,
        savedOutfits: state.savedOutfits.filter((outfit) => outfit.id !== action.payload),
      };
    case 'SET_STORAGE':
      return { ...state, storage: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_ALL':
      return initialState;
    default:
      return state;
  }
}

export function ClosetProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(closetReducer, initialState);

  // Load items from storage on mount
  useEffect(() => {
    loadItems();
    loadStorageConfig();
  }, []);

  const loadItems = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const itemsJson = await AsyncStorage.getItem('closet_items');
      const outfitsJson = await AsyncStorage.getItem('saved_outfits');

      if (itemsJson) {
        dispatch({ type: 'SET_ITEMS', payload: JSON.parse(itemsJson) });
      }
      if (outfitsJson) {
        dispatch({ type: 'SET_OUTFITS', payload: JSON.parse(outfitsJson) });
      }
      dispatch({ type: 'SET_ERROR' });
    } catch (error) {
      console.error('Failed to load items:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load closet items' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const loadStorageConfig = useCallback(async () => {
    try {
      const configJson = await AsyncStorage.getItem('storage_config');
      if (configJson) {
        dispatch({ type: 'SET_STORAGE', payload: JSON.parse(configJson) });
      }
    } catch (error) {
      console.error('Failed to load storage config:', error);
    }
  }, []);

  const addItem = useCallback(
    async (item: ClothingItem) => {
      try {
        dispatch({ type: 'ADD_ITEM', payload: item });
        const updatedItems = [item, ...state.items];
        await AsyncStorage.setItem('closet_items', JSON.stringify(updatedItems));
      } catch (error) {
        console.error('Failed to add item:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to add item' });
      }
    },
    [state.items]
  );

  const updateItem = useCallback(
    async (id: string, updates: Partial<ClothingItem>) => {
      try {
        dispatch({ type: 'UPDATE_ITEM', payload: { id, updates } });
        const updatedItems = state.items.map((item) =>
          item.id === id ? { ...item, ...updates } : item
        );
        await AsyncStorage.setItem('closet_items', JSON.stringify(updatedItems));
      } catch (error) {
        console.error('Failed to update item:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to update item' });
      }
    },
    [state.items]
  );

  const deleteItem = useCallback(
    async (id: string) => {
      try {
        dispatch({ type: 'DELETE_ITEM', payload: id });
        const updatedItems = state.items.filter((item) => item.id !== id);
        await AsyncStorage.setItem('closet_items', JSON.stringify(updatedItems));
      } catch (error) {
        console.error('Failed to delete item:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to delete item' });
      }
    },
    [state.items]
  );

  const saveOutfit = useCallback(
    async (outfit: SavedOutfit) => {
      try {
        dispatch({ type: 'ADD_OUTFIT', payload: outfit });
        const updatedOutfits = [outfit, ...state.savedOutfits];
        await AsyncStorage.setItem('saved_outfits', JSON.stringify(updatedOutfits));
      } catch (error) {
        console.error('Failed to save outfit:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to save outfit' });
      }
    },
    [state.savedOutfits]
  );

  const deleteOutfit = useCallback(
    async (id: string) => {
      try {
        dispatch({ type: 'DELETE_OUTFIT', payload: id });
        const updatedOutfits = state.savedOutfits.filter((outfit) => outfit.id !== id);
        await AsyncStorage.setItem('saved_outfits', JSON.stringify(updatedOutfits));
      } catch (error) {
        console.error('Failed to delete outfit:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to delete outfit' });
      }
    },
    [state.savedOutfits]
  );

  const setStorageType = useCallback(async (type: 'local' | 'cloud') => {
    try {
      const config: StorageConfig = {
        type,
        syncInProgress: false,
        lastSync: Date.now(),
      };
      dispatch({ type: 'SET_STORAGE', payload: config });
      await AsyncStorage.setItem('storage_config', JSON.stringify(config));
    } catch (error) {
      console.error('Failed to set storage type:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to change storage' });
    }
  }, []);

  const clearAllData = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await AsyncStorage.multiRemove(['closet_items', 'saved_outfits', 'storage_config']);
      dispatch({ type: 'CLEAR_ALL', payload: undefined });
      console.log('All data cleared successfully');
    } catch (error) {
      console.error('Failed to clear data:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to clear data' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const value: ClosetContextType = {
    ...state,
    addItem,
    updateItem,
    deleteItem,
    saveOutfit,
    deleteOutfit,
    loadItems,
    setStorageType,
    clearAllData,
  };

  return <ClosetContext.Provider value={value}>{children}</ClosetContext.Provider>;
}

export function useCloset() {
  const context = useContext(ClosetContext);
  if (!context) {
    throw new Error('useCloset must be used within a ClosetProvider');
  }
  return context;
}
