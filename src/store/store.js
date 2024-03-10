import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./services/product_service";

export const store = configureStore({
  reducer: {
    productSlice: productSlice,
  },
  devTools: process.env.NEXT_PUBLIC_NODE_ENV === "development",
});
