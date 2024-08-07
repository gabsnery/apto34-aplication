import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const { reducer, actions } = createSlice({
  name: "language",
  initialState: ["pt-BR", "en-US"].includes(navigator.language)
  ? navigator.language
  : "en-US",
  reducers: {
    changeLanguage: (state, action: PayloadAction<'pt-BR'|'en-US'>) => {
      const value = action.payload
      return value
    },
  },
});

export default reducer;
export const { changeLanguage } = actions;
