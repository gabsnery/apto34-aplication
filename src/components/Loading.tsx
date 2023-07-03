import { LinearProgress, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react';

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
  const theme = useTheme();
  return (
    <Box
      display="flex"
      width="100%"
      maxWidth="100%"
      height="100%"
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
          backgroundColor: theme.palette.info.light}}
        variant={progress ? 'determinate' : 'indeterminate'}
        color="secondary"
        value={progress}
      />
    </Box>
  );
};

export default Loading;
