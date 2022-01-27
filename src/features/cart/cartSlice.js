import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestPOST } from "../../utils/network-requests/";

export const createOrder = createAsyncThunk(
  "cart/createOrder",
  async ({ orderInfo }, { getState }) => {
    console.log("----creating an order---", orderInfo);
    const createdOrder = await requestPOST({
      url: "http://localhost:3000/order/create",
      data: orderInfo,
    });

    return { order: createdOrder };
  }
);

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
    incrementItemQty: (state, action) => {
      const { payload } = action;

      state.items = state.items.map((selectedProduct) =>
        selectedProduct._id === payload._id
          ? {
              ...selectedProduct,
              qty: selectedProduct.qty ? selectedProduct.qty + 1 : 1,
            }
          : selectedProduct
      );
    },
    removeCartItem: (state, action) => {
      const { payload } = action;

      const itemToRemove = state.items.find(({ _id }) => _id === payload._id);

      state.items = itemToRemove
        ? state.items.filter(({ _id }) => _id !== payload._id)
        : state.items;

      state.itemsCount -= itemToRemove ? 1 : 0;
    },
    decrementItemQty: (state, action) => {
      const { payload } = action;

      state.items = state.items.map((selectedProduct) =>
        selectedProduct._id === payload._id
          ? {
              ...selectedProduct,
              qty:
                selectedProduct.qty && selectedProduct.qty !== 0
                  ? selectedProduct.qty - 1
                  : 0,
            }
          : selectedProduct
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        const { order } = action;
        state.loading = false;
        state.order = order;
      });
  },
});

export const {
  addCartItem,
  incrementItemQty,
  removeCartItem,
  decrementItemQty,
} = cartSlice.actions;
export default cartSlice.reducer;
