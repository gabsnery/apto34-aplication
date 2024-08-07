import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const { reducer, actions } = createSlice({
  name: "language",
  initialState: '',
  reducers: {
    changeLanguage: (state, action: PayloadAction<'pt-BR'|'en-US'>) => {
      const value = action.payload
      console.log("🚀 ~ value:", value)
      return value
    },
  },
});

export default reducer;
export const { changeLanguage } = actions;
