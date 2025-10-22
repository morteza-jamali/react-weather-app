const Key = 'name';

export const useUserInfo = () => {
  const getUserName = () => localStorage.getItem(Key);

  const setName = (value: string) => localStorage.setItem(Key, value);

  const isLogedIn = () => {
    const name = getUserName();

    return name !== null && name.trim().length > 0;
  };

  const logout = () => localStorage.removeItem(Key);

  return { isLogedIn, setName, logout, getUserName };
};

export default useUserInfo;
