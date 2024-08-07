import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ConfirmationModal {
  open: boolean
  message: string
  title?: string
  danger?: boolean
  yesText?: string
  noText?: string
  onConfirm?: () => void
}

const initialState: ConfirmationModal = {
  open: false,
  title: '',
  message: '',
  yesText: '',
  noText: '',
  danger: false,
  onConfirm: undefined
}

const { reducer, actions } = createSlice({
  name: 'confirmationModal',
  initialState: initialState,
  reducers: {
    setConfirmationModal: (state, action: PayloadAction<ConfirmationModal>) => ({
      open: action.payload.open ?? false,
      title: action.payload.title ?? 'common|error',
      message: action.payload.message ?? 'common|error',
      danger: action.payload.danger ?? false,
      yesText: action.payload.yesText ?? 'Cancelar',
      noText: action.payload.noText ?? 'Confirmar',
      onConfirm: action.payload.onConfirm ?? undefined
    }),
    clearConfirmationModal: () => initialState
  }
})

export default reducer
export const { setConfirmationModal, clearConfirmationModal } = actions
