import { createSlice } from "@reduxjs/toolkit";

export const DisibleSlice = createSlice({
  name: "isDisible",
  initialState: {
    disabledItems: [], 
  },
  reducers: {
    disableItem: (state, action) => {
      state.disabledItems.push(action.payload); 
    },
    enableItem: (state, action) => {
      state.disabledItems = state.disabledItems.filter((id) => id !== action.payload); 
    },
  },
});

export const { disableItem, enableItem } = DisibleSlice.actions;
export default DisibleSlice.reducer;
