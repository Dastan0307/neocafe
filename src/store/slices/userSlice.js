import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { getCookie } from '../../utils/Cookie'
import axios from 'axios'

const initialState = {
    isAuth: false,
    userId: 60,
}

const accessToken = {
    headers: {
      Authorization: `Bearer ${getCookie('access')}`,
    },
  }

  
  export const getIdUser = createAsyncThunk('storage/getIdUser', async () => {
    try {
      const response = await axios.get(`https://helsinki-backender.org.kg/customers/my-id/`, accessToken);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action){
            state.isAuth = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getIdUser.fulfilled, (state, action) => {
            state.userId = action.payload
        }) 
    }
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;