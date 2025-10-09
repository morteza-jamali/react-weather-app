import type { SxProps, Theme } from '@mui/material';

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

export default sxWithFaFont;
