import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  OrderItem } from "store/types/cart.interfaces";


const { reducer, actions } = createSlice({
  name: "theme",
  initialState: 'light',
  reducers: {
    changeTheme: (state, action: PayloadAction<'dark'|'light'>) => {
      const value = action.payload
      return value
    },
  },
});

export default reducer;
export const { changeTheme } = actions;
