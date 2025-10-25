import type { ComponentProps } from 'react';

export const Image: React.FC<ComponentProps<'img'>> = ({
  loading = 'lazy',
  draggable = false,
  ...props
}) => <img {...props} {...{ loading, draggable }} />;

export default Image;
