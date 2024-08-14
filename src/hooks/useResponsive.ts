import { useMediaQuery } from '@mui/material';

export const useResponsive = () => {
  const isXs = useMediaQuery('(max-width: 600px)');  // Dispositivos pequenos (smartphones)
  const isSm = useMediaQuery('(min-width: 601px) and (max-width: 960px)');  // Tablets e dispositivos móveis grandes
  const isMd = useMediaQuery('(min-width: 961px) and (max-width: 1280px)');  // Laptops e desktops pequenos
  const isLg = useMediaQuery('(min-width: 1281px) and (max-width: 1920px)');  // Desktops grandes
  const isXl = useMediaQuery('(min-width: 1921px)');  // Telas extra grandes

  return { isXs, isSm, isMd, isLg, isXl };
};
