import { createSlice } from '@reduxjs/toolkit'

export interface SnackBar {
  duration: number
  type: 'error' | 'success' | 'info' | 'warning' | undefined
  message: string
}

const initialState: SnackBar = {
  duration: 0,
  message: '',
  type: undefined
}

const { reducer, actions } = createSlice({
  name: 'snackbars',
  initialState: initialState,
  reducers: {
    setSnackbar: (state, action) => ({
      duration: action.payload.duration ?? 4000,
      message: action.payload.message ?? 'common:error',
      type: action.payload.type ?? 'error'
    }),
    clearSnackbar: () => initialState
  }
})

export default reducer
export const { setSnackbar, clearSnackbar } = actions
