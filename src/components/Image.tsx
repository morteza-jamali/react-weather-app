import type { ComponentProps } from 'react';

export interface ImageProps extends ComponentProps<'img'> {}

export const Image: React.FC<ImageProps> = ({
  loading = 'lazy',
  draggable = false,
  ...props
}) => <img {...props} {...{ loading, draggable }} />;

export default Image;
