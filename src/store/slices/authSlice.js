import { api } from '@api/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCookie, setCookie } from '@untils/Cookie'
import { toast } from 'react-toastify'

const initialState = {
  name: '',
  code: '',
  userProfile: [],
}

const config = {
  headers: {
    Authorization: getCookie('pre_token'),
  },
}

const accessToken = {
  headers: {
    Authorization: `Bearer ${getCookie('access')}`,
  },
}

export const checkEmail = createAsyncThunk(
  'auth/checkEmail',
  async ({ email, navigate }) => {
    try {
      const response = await api.post(`/users/login/barista/`, email)
      console.log('response', response)
      toast.success(response.data.message)
      navigate('/code')
      setCookie('email', email.email)
      setCookie('pre_token', response.data.pre_token)
      setCookie('isAuth', false)
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
      setCookie('isAuth', true)
      toast.success(response.data.message)
      return response.data
    } catch (error) {
      setIsCodeTrue(true)
      toast.error(error.message)
      setCookie('isAuth', false)
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

export const getProfileUser = createAsyncThunk(
  'auth/getProfileUser',
  async () => {
    try {
      const response = await api.get(`/barista/profile/`, accessToken)
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfileUser.fulfilled, (state, action) => {
      state.userProfile = action.payload
    })
  },
})

export const { setNameEmail } = authSlice.actions
export default authSlice.reducer
