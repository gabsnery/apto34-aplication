import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "store/api/product/product.interface";
import { IAddress } from "store/types/address.interfaces";
import { Order, OrderItem } from "store/types/cart.interfaces";

const initialState: IAddress = {
  street_name: "",
  street_number: "",
  street_zip_code: "",
  street_city: "",
  street_state: "",
};

const { reducer, actions } = createSlice({
  name: "address",
  initialState: initialState,
  reducers: {
    updateAddress: (state, action: PayloadAction<IAddress>) => {
    
      return action.payload
    },

    clearAddress: () => initialState,
  },
});

export default reducer;
export const { updateAddress } = actions;
