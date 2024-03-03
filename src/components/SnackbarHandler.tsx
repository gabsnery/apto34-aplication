import { Alert, Snackbar, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { clearSnackbar } from '../store/slices/snackbarSlice'
import { RootState } from '../store/store'

const SnackbarHandler = () => {
  const snackbar = useSelector((st: RootState) => st.snackbar)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const theme = useTheme();
  return (
    <Snackbar
      data-testid="snackbar"
      open={!!snackbar?.duration}
      autoHideDuration={snackbar.duration}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      sx={{ whiteSpace: 'pre-line' }}
      onClose={() => dispatch(clearSnackbar())}
    >
      <Alert
        elevation={0}
        variant="filled"
        onClose={() => dispatch(clearSnackbar())}
        severity={snackbar.type}
        sx={{
          filledSuccess: {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.dark,
          },
          borderRadius: 30
        }}
      >
        {t(snackbar.message)}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarHandler