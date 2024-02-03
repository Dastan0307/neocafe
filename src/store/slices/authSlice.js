import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axios from 'axios'

const API = 'http://localhost:3001'

const initialState = {
  name: '',
  code: '',
}

export const checkEmail = createAsyncThunk('auth/checkEmail', async (data) => {
  try {
    const { email, navigate } = data
    const response = await axios.post(`${API}/users/`, email)
    navigate('/code')
    return response.data
  } catch (error) {
    toast.error(error)
  }
})

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  let token = JSON.parse(localStorage.getItem('token'))
  try {
    const Authorization = `Bearer ${token.access}`
    let response = await axios.post(
      `${API}/token/refresh/`,
      { refresh: token.refresh },
      { headers: { Authorization } },
    )
    localStorage.setItem(
      'token',
      JSON.stringify({ refresh: token.refresh, access: response.data.access }),
    )
  } catch (error) {
    toast.errorx('Error', error)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkEmail.rejected, (state, action) => {
      toast.error('Такое имя не сущес')
    })
  },
})

export const { setNameEmail } = authSlice.actions
export default authSlice.reducer
