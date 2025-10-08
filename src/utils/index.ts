import type { SxProps, Theme } from '@mui/material';
import axios from 'axios';

export function sxWithFaFont(
  language: string,
  sx: SxProps<Theme> | undefined = null,
  faSx: SxProps<Theme> | undefined = null,
) {
  if (language !== 'fa') return sx;

  let faStyles: any = { fontFamily: 'IRANYekanX VF' };

  if (faSx !== null && faSx !== undefined) {
    faStyles = { ...faStyles, ...faSx };
  }

  if (sx === null || sx === undefined) return faStyles;

  return { ...faStyles, ...sx };
}

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

export const checkTextDir = (text: string) => {
  const ltrChars =
    'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF' +
    '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF';
  const rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
  const rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']');

  return rtlDirCheck.test(text);
};
