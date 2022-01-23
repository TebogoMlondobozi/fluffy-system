import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsCount: 0,
    items: [],
    totalCost: 0,
  },
  reducers: {
    addCartItem: (state, action) => {
      const { payload } = action;
      state.items = payload;
      state.itemsCount += 1;
    },
  },
});

export const { addCartItem } = cartSlice.actions;
export default cartSlice.reducer;
