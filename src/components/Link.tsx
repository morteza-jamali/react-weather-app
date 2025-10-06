import { Link as MUILink } from '@mui/material';
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from 'react-router';

export interface LinkProps extends Omit<RouterLinkProps, 'component'> {}

export const Link: React.FC<LinkProps> = (props) => (
  <MUILink component={RouterLink} {...props} />
);

export default Link;
