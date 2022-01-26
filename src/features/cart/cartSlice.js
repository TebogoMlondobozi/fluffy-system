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
      const selectedProduct = state.items.find(
        ({ _id }) => _id === payload._id
      );

      state.items = !selectedProduct ? [...state.items, payload] : state.items;
      state.itemsCount += !selectedProduct ? 1 : 0;
    },
    removeCartItem: (state, action) => {
      const { payload } = action;

      const itemToRemove = state.items.find(({ _id }) => _id === payload._id);

      state.items = itemToRemove
        ? state.items.filter(({ _id }) => _id !== payload._id)
        : state.items;

      state.itemsCount -= itemToRemove ? 1 : 0;
    },
  },
});

export const { addCartItem, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
