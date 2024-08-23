import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Order, OrderItem } from "store/types/cart.interfaces";
import { SessionFilter } from "store/types/sessionFilters.interfaces";

const initialState: SessionFilter = {
  category: [],
  size: [],
  color: [],
  type: [],
  discount: undefined,
};

const { reducer, actions } = createSlice({
  name: "sessionFilter",
  initialState: initialState,
  reducers: {
    addFilter: (
      state,
      action: PayloadAction<{
        filter: keyof Omit<SessionFilter, "discount">;
        value: number;
        discount?: number;
      }>
    ) => {
      let item = state;
      item[action.payload.filter]?.push(action.payload.value);
      if (action.payload.discount) item["discount"] = action.payload.discount;
      return item;
    },
    setFilter: (
      state,
      action: PayloadAction<{
        filter: keyof Omit<SessionFilter, "discount">;
        value: number;
        discount?: number;
      }>
    ) => {
      let item = state;
      item[action.payload.filter] = [action.payload.value];
      if (action.payload.discount) item["discount"] = action.payload.discount;
      return item;
    },
    removeFilter: (
      state,
      action: PayloadAction<{
        filter: keyof Omit<SessionFilter, "discount">;
        index: number;
        discount?: number;
      }>
    ) => {
      const item = state;
      item[action.payload.filter].splice(action.payload.index, 1);
      if (action.payload.discount) item["discount"] = action.payload.discount;
      return item;
    },
    clearOneFilter: (
      state,
      action: PayloadAction<{
        filter: keyof Omit<SessionFilter, "discount">;
        discount?: number;
      }>
    ) => {
      const item = state;
      item[action.payload.filter] = [];
      if (action.payload.discount) item["discount"] = action.payload.discount;
      return item;
    },
    clearFilter: () => initialState,
  },
});

export default reducer;
export const {
  addFilter,
  setFilter,
  clearOneFilter,
  clearFilter,
  removeFilter,
} = actions;
