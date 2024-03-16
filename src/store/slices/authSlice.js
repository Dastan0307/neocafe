import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { api } from '@api/api'
import { setCookie, removeCookie } from '@hooks/Cookie'

const initialState = {
  name: '',
  code: '',
}

export const checkEmail = createAsyncThunk(
  'auth/checkEmail',
  async ({ email, navigate }) => {
    try {
      const response = await api.post(`/users/`, email)
      navigate('/code')
      setCookie('email', email.email)
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
      const response = await api.post(`/code/`, code_active)
      navigate('/main')
      setIsCodeTrue(false)
      return response.data
    } catch (error) {
      setIsCodeTrue(true)
      removeCookie('email')
      toast.error(error.message)
    }
  },
)

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
