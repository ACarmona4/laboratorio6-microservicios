import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { usersClient } from '../api/usersClient.js';

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [userError, setUserError] = useState('');

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      setIsLoadingUser(true);
      setUserError('');
      try {
        const nextUser = await usersClient.getCurrentUser();
        if (mounted) {
          setUser(nextUser);
        }
      } catch (error) {
        if (mounted) {
          setUserError(error.message || 'Failed to load user');
        }
      } finally {
        if (mounted) {
          setIsLoadingUser(false);
        }
      }
    };

    loadUser();

    return () => {
      mounted = false;
    };
  }, []);

  const updateUser = async (payload) => {
    if (!user) {
      return null;
    }

    const updated = await usersClient.updateCurrentUser(user.id, payload);
    setUser(updated);
    return updated;
  };

  const value = useMemo(
    () => ({
      user,
      isLoadingUser,
      userError,
      updateUser,
    }),
    [isLoadingUser, updateUser, user, userError]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used inside UserProvider');
  }

  return context;
};
