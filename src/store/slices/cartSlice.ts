import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "store/api/product/product.interface";
import { Order, OrderItem } from "store/types/cart.interfaces";

const initialState: Order  = {
  items: [],
  total: 0,
};

const { reducer, actions } = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<OrderItem>) => {
      const orderItem = state.items.findIndex(
        (item) => (item.product.id === action.payload.product.id && item.idColor === action.payload.idColor &&
          item.idSize === action.payload.idSize)
      );
      let items = [...state.items];
      if (orderItem >= 0)
        items[orderItem] = {
          quantity: items[orderItem].quantity + action.payload.quantity,
          product: items[orderItem].product,
          idColor: items[orderItem].idColor,
          idSize: items[orderItem].idSize,
        };
      else {
        items.push({
          product: action.payload.product,
          idSize: action.payload.idSize,
          idColor: action.payload.idColor,
          quantity: action.payload.quantity,
        });
      }
      
      return {
        items: items,
        total: items.reduce(
          (partialSum, a) => partialSum +( (a.product.valor_produto * ((100 - a.product.discount)/100)) * a.quantity),
          0
        ),
      };
    },
    deleteProduct: (state, action: PayloadAction<OrderItem>) => {
      const orderItem = state.items.findIndex(
        (item) => (item.product.id === action.payload.product.id && item.idColor === action.payload.idColor &&
          item.idSize === action.payload.idSize)
      );
      let items = [...state.items];
      if (orderItem >= 0) {
        items.splice(orderItem,1);
      }
      return {
        items: items,
        total: items.reduce(
          (partialSum, a) => partialSum + a.product.valor_produto * a.quantity,
          0
        ),
      };
    },
    clearCart: () => initialState,
  },
});

export default reducer;
export const { addProduct, clearCart, deleteProduct } = actions;
