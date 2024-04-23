import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { api } from '@api/api'
import { setCookie, removeCookie } from '@hooks/Cookie'

const initialState = {
  name: '',
  code: '',
<<<<<<< HEAD
=======
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
>>>>>>> f0f51b7884d21807c405a1a45341b44827ba3d22
}

export const checkEmail = createAsyncThunk(
  'auth/checkEmail',
  async ({ email, navigate }) => {
    try {
<<<<<<< HEAD
      const response = await api.post(`/users/`, email)
      navigate('/code')
      setCookie('email', email.email)
=======
      const response = await api.post(`/users/login/barista/`, email)
      toast.success(response.data.message)
      navigate('/code')
      setCookie('email', email.email)
      setCookie('pre_token', response.data.pre_token)
      setCookie('isAuth', false)
      configAuth.headers.Authorization = response.data.pre_token
>>>>>>> f0f51b7884d21807c405a1a45341b44827ba3d22
      return response.data
    } catch (error) {
      toast.error(error.message)
    }
  },
)

export const checkCode = createAsyncThunk(
  'auth/checkCode',
  async ({ code_active, navigate, setIsCodeTrue }) => {
    try {
<<<<<<< HEAD
      const response = await api.post(`/code/`, code_active)
      navigate('/main')
      setIsCodeTrue(false)
=======
      const response = await api.post(`/users/verify/email/`, formData, configAuth)
      toast.success(response.data.detail)
      navigate('/orders')
      setIsCodeTrue(false)
      setCookie('refresh', response.data.refresh)
      setCookie('access', response.data.access)
      setCookie('isAuth', true)
>>>>>>> f0f51b7884d21807c405a1a45341b44827ba3d22
      return response.data
    } catch (error) {
      setIsCodeTrue(true)
      removeCookie('email')
      toast.error(error.message)
<<<<<<< HEAD
=======
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
>>>>>>> f0f51b7884d21807c405a1a45341b44827ba3d22
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
<<<<<<< HEAD
    builder.addCase(checkEmail.rejected, (state, action) => {
      toast.error('Такое имя не сущес')
=======
    builder
    .addCase(checkEmail.pending, (state, action) => {
      state.isLoading = true
    })
    .addCase(checkEmail.fulfilled, (state, action) => {
      state.isLoading = false
    })
    .addCase(getProfileUser.fulfilled, (state, action) => {
      state.userProfile = action.payload
>>>>>>> f0f51b7884d21807c405a1a45341b44827ba3d22
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
