import { LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react';
import { useTheme } from 'styled-components';
import { tokens } from 'ui-layout/tokens';

const Loading: FC<React.PropsWithChildren<{
  progress?: number;
}>> = ({ progress }) => {
  // const springL = useSpring({
  //   loop: { reverse: true },
  //   from: {
  //     x: 200
  //   },
  //   x: 0,
  //   config: { duration: 3000, ...config.stiff },
  //   reset: true
  // })
  return (
    <Box
      display="flex"
      width="100%"
      maxWidth="100%"
      height="100%"
      marginTop={'200px'}
      maxHeight="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <LinearProgress
        sx={{
          borderRadius: 60,
          width: 380,
          height: 32,
          backgroundColor: tokens.colors.primary}}
        variant={progress ? 'determinate' : 'indeterminate'}
        value={progress}
      />
    </Box>
  );
};

export default Loading;
