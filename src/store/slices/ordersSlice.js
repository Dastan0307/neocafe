import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    takeawayOrders: [],
    cafeOrders: [],

    takeawayNewOrders: [],
    takeawayInProcess: [],
    takeawayReady: [],
    takeawayCanceled: [],
    takeawayCompleted: [],

    cafeNewOrders: [],
    cafeInProcess: [],
    cafeReady: [],
    cafeCanceled: [],
    cafeCompleted: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
      state.takeawayOrders = state.orders.filter(order => order.order_type === 'На вынос')
      state.cafeOrders = state.orders.filter(order => order.order_type === 'В заведении')

      state.takeawayNewOrders = state.takeawayOrders.filter(order => order.status === 'Новый')
      state.takeawayInProcess = state.takeawayOrders.filter(order => order.status === 'В процессе')
      state.takeawayReady = state.takeawayOrders.filter(order => order.status === 'Готово')
      state.takeawayCanceled = state.takeawayOrders.filter(order => order.status === 'Отменено')
      state.takeawayCompleted = state.takeawayOrders.filter(order => order.status === 'Завершено')
      
      state.cafeNewOrders = state.cafeOrders.filter(order => order.status === 'Новый')
      state.cafeInProcess = state.cafeOrders.filter(order => order.status === 'В процессе')
      state.cafeReady = state.cafeOrders.filter(order => order.status === 'Готово')
      state.cafeCanceled = state.cafeOrders.filter(order => order.status === 'Отменено')
      state.cafeCompleted = state.cafeOrders.filter(order => order.status === 'Завершено')
    },
    setTakeAwayOrders(state, action){
        state.takeawayOrders = state.orders.filter(order => order.order_type === 'На вынос')
    }
  },
});

export const { setOrders, setTakeAwayOrders } = orderSlice.actions;
export default orderSlice.reducer;