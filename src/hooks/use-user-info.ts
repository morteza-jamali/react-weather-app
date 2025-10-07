import { useEffect, useMemo, useState } from 'react';

const Key = 'name';

export const useUserInfo = () => {
  const [name, setName] = useState(
    useMemo(() => localStorage.getItem(Key), []),
  );

  const setLocalStorage = (value: string) => localStorage.setItem(Key, value);

  const isLogedIn = name !== null && name.trim().length > 0;

  const logout = () => localStorage.removeItem(Key);

  useEffect(() => {
    const checkLocalStorage = () => {
      setName(localStorage.getItem(Key));
    };

    window.addEventListener('storage', checkLocalStorage);

    return () => {
      window.removeEventListener('storage', checkLocalStorage);
    };
  }, []);

  return { name, isLogedIn, setName: setLocalStorage, logout };
};

export default useUserInfo;
