import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserProfile = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

type UserContextValue = {
  user: UserProfile;
  isHydrating: boolean; 
  updateUser: (patch: Partial<UserProfile>) => void;
  resetUser: () => void;
};

const STORAGE_KEY = 'user_profile_v1';

const INITIAL_USER: UserProfile = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<UserProfile>;
          setUser({ ...INITIAL_USER, ...parsed });
        }
      } catch (e) {
        console.warn('Failed to load user profile:', e);
      } finally {
        setIsHydrating(false);
      }
    })();
  }, []);

  const updateUser = (patch: Partial<UserProfile>) => {
    setUser((prev) => {
      const next = { ...prev, ...patch };
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch((e) =>
        console.warn('Failed to save user profile:', e)
      );
      return next;
    });
  };

  const resetUser = () => {
    setUser(INITIAL_USER);
    AsyncStorage.removeItem(STORAGE_KEY).catch((e) =>
      console.warn('Failed to remove user profile:', e)
    );
  };

  const value = useMemo(
    () => ({ user, isHydrating, updateUser, resetUser }),
    [user, isHydrating]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}