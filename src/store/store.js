import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import modalReducer from './slices/modalSlice'
import menuReducer from './slices/menuSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    menu: menuReducer,
  },
})
