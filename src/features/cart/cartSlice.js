import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestPOST, requestPUT } from "../../utils/network-requests/";

export const createPickupAddress = createAsyncThunk(
  "cart/createPickupAddress",
  async ({ userId, addressInfo, mutate }, { getState, dispatch }) => {
    await requestPOST({
      url: `http://localhost:3000/account/address/${userId}`,
      data: addressInfo,
    }).then((newAddress) => {
      if (newAddress) {
        mutate();
      }
      return newAddress;
    });
  }
);

export const updatePickupAddress = createAsyncThunk(
  "cart/updatePickupAddress",
  async ({ addressId, addressInfo, mutate }, { getState, dispatch }) => {
    await requestPUT({
      url: `http://localhost:3000/account/address/${addressId}`,
      data: addressInfo,
    }).then((updatedAddress) => {
      if (updatedAddress) {
        mutate();
        return updatedAddress;
      }
    });
  }
);

export const createOrder = createAsyncThunk(
  "cart/createOrder",
  async ({ orderInfo, navigate }, { getState, dispatch }) => {
    const createdOrder = await requestPOST({
      url: "http://localhost:3000/order/create",
      data: orderInfo,
    }).then((order) => {
      if (order) {
        dispatch(removeCartItems({ emptyItems: [] }));
        navigate();
        return order;
      }
    });

    return createdOrder;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsCount: 0,
    items: [],
    totalCost: 0,
    order: {},
  },
  reducers: {
    addCartItem: (state, action) => {
      const { payload } = action;
      const selectedProduct = state.items.find(
        ({ _id }) => _id === payload._id
      );

      state.items = !selectedProduct
        ? [...state.items, { ...payload, qty: 1 }]
        : state.items;
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
    removeCartItems: (state, action) => {
      const { payload } = action;

      state.items = payload.emptyItems;
      state.itemsCount = payload.emptyItems.length;
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
        const { payload } = action;
        state.loading = false;
        state.order = payload;
      });
  },
});

export const {
  addCartItem,
  incrementItemQty,
  removeCartItem,
  removeCartItems,
  decrementItemQty,
} = cartSlice.actions;
export default cartSlice.reducer;
