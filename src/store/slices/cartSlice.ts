import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Order, OrderItem } from 'store/types/cart.interfaces'



const initialState: Order = {
  items: [],
  total: 0,
}

const { reducer, actions } = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<OrderItem>) => {
      const orderItem = state.items.findIndex(item => item.product.id === action.payload.product.id)
      console.log("🚀 ~ file: cartSlice.ts:17 ~ action.payload.product:", action.payload.product)
      console.log("🚀 ~ file: cartSlice.ts:17 ~ state.items:", state.items)
      console.log("🚀 ~ file: cartSlice.ts:17 ~ orderItem:", orderItem)
      let items = [...state.items]
      console.log("🚀 ~ file: cartSlice.ts:21 ~ items[orderItem]:", items[orderItem])
      if (orderItem >= 0)
        items[orderItem] = { quantity: items[orderItem].quantity + action.payload.quantity, product: items[orderItem].product }
      else {
        items.push({
          product: action.payload.product,
          quantity: action.payload.quantity
        })
      }
      console.log("🚀 ~ file: cartSlice.ts:29 ~ items:", items)
      return ({
        items: items,
        total: items.reduce((partialSum, a) => partialSum + (a.product.value*a.quantity), 0),
      })
    },
    clearCart: () => initialState
  }
})

export default reducer
export const { addProduct, clearCart } = actions
