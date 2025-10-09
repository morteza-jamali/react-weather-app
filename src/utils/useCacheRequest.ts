import axios from 'axios';

export const useCacheRequest = async (query: string) => {
  const cachedResult = localStorage.getItem(query);

  if (cachedResult) {
    return JSON.parse(cachedResult);
  }

  console.log(query);
  const result = await axios.get(query);

  localStorage.setItem(
    query,
    result.data ? JSON.stringify(result.data) : 'null',
  );

  return result.data;
};

export default useCacheRequest;
