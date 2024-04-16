import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeStatus: 'Новые',
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setActiveStatus(state, action) {
        state.activeStatus = action.payload;
    },
  },
});

export const { setActiveStatus } = statusSlice.actions;
export default statusSlice.reducer;