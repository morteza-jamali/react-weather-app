import {
  createTheme as _createTheme,
  type Direction,
} from '@mui/material/styles';

interface CreateThemeProps {
  direction?: Direction;
}

export const createTheme = ({ direction }: CreateThemeProps) =>
  _createTheme({
    colorSchemes: {
      dark: true,
    },
    direction,
  });

export default createTheme;
