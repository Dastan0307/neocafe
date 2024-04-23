import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getCookie } from '../../utils/Cookie'

const initialState = {
  notifications: [],
}

const API = 'https://helsinki-backender.org.kg'

export const getNotifications = createAsyncThunk(
  'notification/getNotifications',
  async () => {
    try {
      const response = await axios.get(`${API}/notifications/notifications/`, {
        headers: {
          Authorization: `Bearer ${getCookie('access')}`,
        },
      })
      return response.data
    } catch (error) {
      toast.error(error.message)
    }
  },
)

export const deleteOneNotification = createAsyncThunk(
  'notification/getNotifications',
  async ({ id, handleGetNotifications }) => {
    try {
      const response = await axios.delete(
        `${API}/notifications/delete/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${getCookie('access')}`,
          },
        },
      )
      handleGetNotifications()
      return response.data
    } catch (error) {
      toast.error(error.message)
    }
  },
)

export const deleteAllNotifications = createAsyncThunk(
  'notification/getNotifications',
  async (handleGetNotifications) => {
    try {
      const response = await axios.delete(`${API}/notifications/delete/all/`, {
        headers: {
          Authorization: `Bearer ${getCookie('access')}`,
        },
      })
      handleGetNotifications()
      return response.data
    } catch (error) {
      toast.error(error.message)
    }
  },
)

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload
    })
  },
})

export default notificationSlice.reducer
