import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCookie } from '../../utils/Cookie'
import axios from 'axios'
import { toast } from 'react-toastify'


const config = {
	headers: {
		Authorization: `Bearer ${getCookie('access')}`,
	},
}

const initialState = {
	notifications: [],
}

const API = 'https://helsinki-backender.org.kg'

export const getNotifications = createAsyncThunk(
	'notification/getNotifications',
	async () => {
		try {
			const response = await axios.get(`${API}/notifications/notifications/`, config)
			return response.data
		} catch (error) {
			toast.error(error.message)
		}
	}
)

export const deleteOneNotification = createAsyncThunk(
	'notification/getNotifications',
	async ({id, handleGetNotifications}) => {
		try {
			const response = await axios.delete(`${API}/notifications/delete/${id}/`, config)
			handleGetNotifications()
			return response.data
		} catch (error) {
			toast.error(error.message)
		}
	}
)

export const deleteAllNotifications = createAsyncThunk(
	'notification/getNotifications',
	async (handleGetNotifications) => {
		try {
			const response = await axios.delete(`${API}/notifications/delete/all/`, config)
			handleGetNotifications()
			return response.data
		} catch (error) {
			toast.error(error.message)
		}
	}
)

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getNotifications.fulfilled, (state, action) => {
			state.notifications = action.payload
		})
	},
})

export default notificationSlice.reducer

