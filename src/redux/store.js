import { configureStore } from "@reduxjs/toolkit";
import { CounterSlice } from "./counterSlice";
import { DisibleSlice } from "./isdisabled";
import { shopingBasketSlice } from "./ShopingBasketSlice";

const store = configureStore({
  reducer: {
    counter: CounterSlice.reducer,
    isDisible: DisibleSlice.reducer,
    ShopCounter: shopingBasketSlice.reducer,
  },
});

export default store;
