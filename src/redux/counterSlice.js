import { createSlice } from "@reduxjs/toolkit";


export const CounterSlice = createSlice({
  name: "counter",
  initialState:{
    value:0
  },
  reducers:{
    plus:(state)=>{
      state.value+=1
    },
    mines:(state)=>{
      
      state.value-=1
    }

  }
})

export const { mines, plus } = CounterSlice.actions;

export default CounterSlice.reducer;