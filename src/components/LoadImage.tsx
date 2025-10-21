import { Stack } from '@mui/material';
import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { styled } from '@mui/material/styles';
import { Image as _Image } from './Image';

export interface LoadImageProps extends Omit<ComponentProps<'img'>, 'ref'> {
  fallback?: ReactNode;
}

const FallbackStack = styled(Stack)({
  position: 'absolute',
  inset: 0,
});

const Root = styled('div')({
  position: 'relative',
});

const Image = styled(_Image)({
  position: 'absolute',
  inset: 0,
  margin: 'auto',
});

const LoadImageComponent: React.FC<LoadImageProps> = ({
  fallback,
  height,
  width,
  className,
  ...props
}) => {
  const [rendered, setRendered] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const checkIfRendered = () => {
    const img = imgRef.current;

    if (img?.complete && img?.naturalWidth > 0) {
      setRendered(true);
    } else {
      requestAnimationFrame(checkIfRendered);
    }
  };

  useEffect(() => {
    const handleImageLoad = () => {
      requestAnimationFrame(checkIfRendered);
    };

    imgRef.current?.addEventListener('load', handleImageLoad);

    return () => {
      imgRef.current?.removeEventListener('load', handleImageLoad);
    };
  }, []);

  return (
    <Root
      sx={{
        height: height === 'auto' ? '100%' : height,
        width: width === 'auto' ? '100%' : width,
      }}
      {...{ className }}
    >
      {!rendered && (
        <FallbackStack
          justifyContent="center"
          alignItems="center"
          sx={{ zIndex: 1 }}
          className="fallback__root"
        >
          {fallback}
        </FallbackStack>
      )}
      <Image {...{ height, width }} {...props} ref={imgRef} />
    </Root>
  );
};

export const LoadImage = styled(LoadImageComponent)({});

export default LoadImage;
