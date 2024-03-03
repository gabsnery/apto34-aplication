import { Middleware } from '@reduxjs/toolkit'
import { setSnackbar } from 'store/slices/snackbarSlice'

const mid: Middleware = (store) => (next) => (action) => {
  if (action.type.includes("Mutation")) {
      if (action.type.endsWith("fulfilled")) {
        // Successful mutation
        const successMessage =
          action?.payload?.response?.message || "Succuss!";
          store.dispatch(
            setSnackbar({
              type: 'success',
              message: successMessage,
              duration: 4000
            })
          )
      } else if (action.type.endsWith("rejected")) {
        // Failed mutation
        const errorMessage =
          action?.payload?.data?.message || "Unkown Error accourred.";
          store.dispatch(
            setSnackbar({
              type: 'error',
              message: JSON.stringify(errorMessage),
              duration: 4000
            })
          )
      }
  }
  if (action?.error && action?.error.name !== 'ConditionError') {
    const mssg = action?.payload?.status === 401 ? 'common|expiredSession' : action?.payload?.data? action?.payload?.data :(action?.error?.message) ?? 'common|error'
    store.dispatch(
      setSnackbar({
        type: 'error',
        message: JSON.stringify(mssg),
        duration: 4000
      })
    )
  }
  return next(action)
}
export default mid