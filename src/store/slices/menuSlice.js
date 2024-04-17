import { api } from '@api/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const initialState = {
  branches_menu: [],
  category: [],
  one_product: [],
}

export const getBranchesMenu = createAsyncThunk(
  'menu/getBranchesMenu',
  async () => {
    try {
      const response = await api.get('/branches/branches/menu/')
      return response.data
    } catch (error) {
      toast.error(error.message)
    }
  },
)

export const getCategory = createAsyncThunk('menu/getCategory', async () => {
  try {
    const response = await api.get('/menu/categories/')
    return response.data
  } catch (error) {
    toast.error(error.message)
  }
})

export const getProductById = createAsyncThunk(
  'menu/getProductById',
  async (id) => {
    try {
      const response = await api.get(`/menu/menus/${id}/`)
      return response.data
    } catch (error) {
      toast.error(error.message)
    }
  },
)

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBranchesMenu.fulfilled, (state, action) => {
        state.branches_menu = action.payload
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.category = action.payload
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.one_product = action.payload
      })
  },
})

export default menuSlice.reducer
