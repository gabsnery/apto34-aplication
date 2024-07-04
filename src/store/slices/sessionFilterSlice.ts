import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Order, OrderItem } from 'store/types/cart.interfaces'
import { SessionFilter } from 'store/types/sessionFilters.interfaces'



const initialState: SessionFilter = {
  category: [],
  size: [],
  color: [],
  type: [],
}

const { reducer, actions } = createSlice({
  name: 'sessionFilter',
  initialState: initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<({filter:keyof SessionFilter,value:number})>) => {
      let item = state
      item[action.payload.filter]?.push(action.payload.value)
      return (item)
    },
    removeFilter: (state, action: PayloadAction<({filter:keyof SessionFilter,index:number})>) => {
      const item = state
      item[action.payload.filter].splice(action.payload.index, 1);
      return (item)
    },
    clearFilter: () => initialState
  }
})

export default reducer
export const { addFilter, clearFilter,removeFilter } = actions
