import { api } from '@api/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCookie, setCookie } from '@utils/Cookie'
import { toast } from 'react-toastify'

const initialState = {
  name: '',
  code: '',
  userProfile: [],
  isLoading: false,
}

const config = {
  headers: {
    Authorization: getCookie('pre_token'),
    'Content-Type': 'muitipart/formdata'
  },
}
const configAuth = {
  headers: {
    Authorization: getCookie('pre_token'),
    'Content-Type': 'muitipart/formdata'
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
      toast.success(response.data.message)
      navigate('/code')
      setCookie('email', email.email)
      setCookie('pre_token', response.data.pre_token)
      setCookie('isAuth', false)
      configAuth.headers.Authorization = response.data.pre_token
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
      const response = await api.post(`/users/verify/email/`, formData, configAuth)
      toast.success(response.data.detail)
      navigate('/orders')
      setIsCodeTrue(false)
      setCookie('refresh', response.data.refresh)
      setCookie('access', response.data.access)
      setCookie('isAuth', true)
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
      toast.error(error.message)
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(checkEmail.pending, (state, action) => {
      state.isLoading = true
    })
    .addCase(checkEmail.fulfilled, (state, action) => {
      state.isLoading = false
    })
    .addCase(getProfileUser.fulfilled, (state, action) => {
      state.userProfile = action.payload
    })
    .addCase(checkCode.pending, (state, action) => {
      state.isLoading = true
    })
    .addCase(checkCode.fulfilled, (state, action) => {
      state.isLoading = false
    })
    .addCase(checkCode.rejected, (state, action) => {
      toast.error = action.payload
    })
  },
})

export const { setNameEmail } = authSlice.actions
export default authSlice.reducer
