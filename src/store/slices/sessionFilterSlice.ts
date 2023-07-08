import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Order, OrderItem } from 'store/types/cart.interfaces'
import { SessionFilter } from 'store/types/sessionFilters.interfaces'



const initialState: SessionFilter = {
  category: [],
  tags: [],
  size: [],
  color: [],
}

const { reducer, actions } = createSlice({
  name: 'sessionFilter',
  initialState: initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<({filter:keyof SessionFilter,value:number})>) => {
      let item = state
      console.log("🚀 ~ file: sessionFilterSlice.ts:20 ~ item:", item)
      console.log("🚀 ~ file: sessionFilterSlice.ts:19 ~ filter:", action.payload.filter)
      console.log("🚀 ~ file: sessionFilterSlice.ts:22 ~ item[action.payload.filter]:", item[action.payload.filter])
      console.log("🚀 ~ file: sessionFilterSlice.ts:24 ~ action.payload.value:", action.payload.value)
      item[action.payload.filter]?.push(action.payload.value)
      console.log("🚀 ~ file: sessionFilterSlice.ts:25 ~ item:", item)
      return (item)
    },
    clearFilter: () => initialState
  }
})

export default reducer
export const { addFilter, clearFilter } = actions
