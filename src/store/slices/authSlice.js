import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { api } from '@api/api'
import { setCookie } from '@hooks/Cookie'
import { getCookie } from '../../hooks/Cookie'

const initialState = {
  name: '',
  code: '',
}

const config = {
  headers: {
    Authorization: getCookie('pre_token'),
  },
}

export const checkEmail = createAsyncThunk(
  'auth/checkEmail',
  async ({ email, navigate }) => {
    try {
      const response = await api.post(`/users/login/barista/`, email)
      toast.success(response.data.message)
      navigate('/code')
      setCookie('email', email.email)
      setCookie('pre_token', response.data.pre_token)
      return response.data
    } catch (error) {
      toast.error(error.message)
    }
  },
)

export const checkCode = createAsyncThunk(
  'auth/checkCode',
  async ({ formData, navigate, setIsCodeTrue }) => {
    try {
      const response = await api.post(`/users/verify/email/`, formData, config)
      toast.success(response.data.detail)
      navigate('/main')
      setIsCodeTrue(false)
      setCookie('refresh', response.data.refresh)
      setCookie('access', response.data.access)
      toast.success(response.data.message)
      return response.data
    } catch (error) {
      setIsCodeTrue(true)
      toast.error(error.message)
    }
  },
)
export const retrieveСode = createAsyncThunk('auth/retrieveСode', async () => {
  try {
    const response = await api.get(`/users/resend-code/`, config)
    toast.success(response.data.detail)
    return response.data
  } catch (error) {
    toast.error(error.message)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
})

export const { setNameEmail } = authSlice.actions
export default authSlice.reducer
