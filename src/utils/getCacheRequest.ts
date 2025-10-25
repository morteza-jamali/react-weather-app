import axios from 'axios';

type UseCacheRequestType = (query: string) => Promise<{
  isFromCache: boolean;
  data: any;
}>;

export const getCacheRequest: UseCacheRequestType = async (query) => {
  const cachedResult = localStorage.getItem(query);

  if (cachedResult) {
    return {
      isFromCache: true,
      data: JSON.parse(cachedResult),
    };
  }

  const result = await axios.get(query);

  localStorage.setItem(
    query,
    result.data ? JSON.stringify(result.data) : 'null',
  );

  return {
    isFromCache: false,
    data: result.data,
  };
};

export default getCacheRequest;
