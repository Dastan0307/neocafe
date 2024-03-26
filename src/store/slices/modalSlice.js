import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  modalType: null,
  modalProps: {},
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action) {
      state.isOpen = true
      state.modalType = action.payload.modalType
      state.modalProps = action.payload.modalProps
    },
    closeModal(state, action) {
      state.isOpen = false
      state.modalType = null
      state.modalProps = {}
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
