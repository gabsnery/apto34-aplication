import { createSlice } from '@reduxjs/toolkit'

export interface ConfirmationModal {
  open: boolean
  message: string
  onConfirm?:()=>void
}

const initialState: ConfirmationModal = {
  open: false,
  message: '',
  onConfirm: undefined
}

const { reducer, actions } = createSlice({
  name: 'confirmationModal',
  initialState: initialState,
  reducers: {
    setConfirmationModal: (state, action) => ({
      open: action.payload.open ?? false,
      message: action.payload.message ?? 'common:error',
      onConfirm: action.payload.onConfirm ?? undefined
    }),
    clearConfirmationModal: () => initialState
  }
})

export default reducer
export const { setConfirmationModal, clearConfirmationModal } = actions
