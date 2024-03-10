import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productDetails: {},
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    productDetailsAction: (state, actions) => {
      const { itemDetails } = actions.payload;
      state.productDetails = itemDetails;
    },
  },
});

// Action creators are generated for each case reducer function
export const { productDetailsAction } = productSlice.actions;

export default productSlice.reducer;
