import type { SxProps, Theme } from '@mui/material';

export function sxWithFaFont(
  language: string,
  sx: SxProps<Theme> | undefined = null,
) {
  if (language !== 'fa') return sx;

  if (sx === null || sx === undefined) return { fontFamily: 'IRANYekanX VF' };

  return { fontFamily: 'IRANYekanX VF', ...sx };
}
