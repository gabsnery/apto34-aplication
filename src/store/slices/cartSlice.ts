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
      console.log("🚀 ~ state:", state)
      console.log("🚀 ~ orderItem:", orderItem)
      let items = [...state.items]
      if (orderItem >= 0)
        items[orderItem] = { quantity: items[orderItem].quantity + action.payload.quantity, product: items[orderItem].product }
      else {
        items.push({
          product: action.payload.product,
          quantity: action.payload.quantity
        })
      }
      return ({
        items: items,
        total: items.reduce((partialSum, a) => partialSum + (a.product.valor_produto*a.quantity), 0),
      })
    },
    clearCart: () => initialState
  }
})

export default reducer
export const { addProduct, clearCart } = actions
