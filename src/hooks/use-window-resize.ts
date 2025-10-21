import { useMediaQuery } from '@mui/material';
import { useEffect, useState, type RefObject } from 'react';

interface SizeType {
  width: number;
  height: number;
}

export const useWindowResize = (query: string, ref: RefObject<any>) => {
  const [size, setSize] = useState<SizeType | null>(null);
  const mqMatch = useMediaQuery(query);

  useEffect(() => {
    const handleCardResize = () => {
      if (window.matchMedia(query).matches) {
        setSize({
          height: ref.current?.offsetHeight,
          width: ref.current?.offsetWidth,
        });
      }
    };

    if (mqMatch) {
      handleCardResize();

      window.addEventListener('resize', handleCardResize);

      return () => window.removeEventListener('resize', handleCardResize);
    } else {
      setSize(null);
    }
  }, [mqMatch, ref.current]);

  return size;
};

export default useWindowResize;
