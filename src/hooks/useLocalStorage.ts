import { useState, useEffect, useCallback } from 'react';
import { storage } from '@/lib/utils';

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    return storage.get(key, defaultValue);
  });

  const setStoredValue = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue(currentValue => {
      const valueToStore = newValue instanceof Function ? newValue(currentValue) : newValue;
      storage.set(key, valueToStore);
      return valueToStore;
    });
  }, [key]);

  const removeStoredValue = useCallback(() => {
    storage.remove(key);
    setValue(defaultValue);
  }, [key, defaultValue]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        setValue(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [value, setStoredValue, removeStoredValue] as const;
}
