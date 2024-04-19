import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items:[],
}

export const orderCart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action){
        const findItem = state.items.find((obj) => obj.id === action.payload.id)
        if(findItem){
            findItem.count++
        }else{
            state.items.push({
                ...action.payload,
                count: 1
            })
        }
        state.totalPrice = state.items.reduce((sum, obj) =>{
            return (obj.price * obj.count ) + sum
        }, 0)
    },
    clearItems(state){
        state.items = [];
        state.totalPrice = 0;
    },
    minusItem(state, action){
        const findItem = state.items.find((obj) => obj.id === action.payload)
        if(findItem){
            findItem.count--
        }
    },
    openOrderCart(state, action){
        state.totalPrice = +action.payload.total_price;
        state.items = action.payload.items;
    }
  },
})

export const { addItem, clearItems, minusItem, openOrderCart } = orderCart.actions

export default orderCart.reducer