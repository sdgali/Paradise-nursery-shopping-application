import { createSlice } from "@reduxjs/toolkit";

export const shopingBasketSlice = createSlice({
  name: "shopCartCounter",
  initialState: {
    megdars: {}, 
    items: [], 
  },
  reducers: {
    addItem: (state, action) =>{
      const { id, name, img, cost } = action.payload;

      if (!state.megdars[id]) {
        state.megdars[id] = 1; 
        state.items.push({ id, name, img, cost, quantity: 1 });
      } else {

        shopingBasketSlice.caseReducers.increment(state, { payload: id });
      }
    },
    increment: (state, action) =>{
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (state.megdars[id]) {
        state.megdars[id] += 1;
        if (item) item.quantity += 1;
      } else {
        state.megdars[id] = 1;
        if (!item) state.items.push({ id, quantity: 1});
      }
    },
    decrement: (state, action) => {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);

      if (state.megdars[id] && state.megdars[id] > 0) {
        state.megdars[id] -= 1;
        if (item && item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.id !== id);

          shopingBasketSlice.caseReducers.enableItem(state,{ payload: id});

        }
      }
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      delete state.megdars[id]; 
      state.items = state.items.filter(item => item.id !== id);
    },
  },
});

export const selectTotalItems = (state) => {
  return Object.values(state.ShopCounter.megdars).reduce((total, count) => total + count, 0);
};

export const { increment, decrement, deleteItem, addItem } = shopingBasketSlice.actions;

export default shopingBasketSlice.reducer;
