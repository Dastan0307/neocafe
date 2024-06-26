import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import modalReducer from './slices/modalSlice'
import menuReducer from './slices/menuSlice'
import ordersReducer from './slices/ordersSlice'
import statusReducer from './slices/statusSlice'
import userReducer from './slices/userSlice'
import notificationReducer from './slices/notificationSlice'
import orderCartReducer from './slices/orderCartSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    menu: menuReducer,
    orders: ordersReducer,
    status: statusReducer,
    user: userReducer,
    notification: notificationReducer,
    orderCart: orderCartReducer
  },
})
