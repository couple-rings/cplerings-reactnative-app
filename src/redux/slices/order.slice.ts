import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderState {
  currentOrder: number;

  orderVerified: boolean;

  imageUploaded: boolean;
}

const initialState: OrderState = {
  currentOrder: 0,

  orderVerified: false,

  imageUploaded: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    selectOrder: (state, { payload }: PayloadAction<number>) => {
      state.currentOrder = payload;
    },
    removeOrder: (state) => {
      state.currentOrder = 0;
      state.orderVerified = false;
      state.imageUploaded = false;
    },
    verifyOrder: (state) => {
      state.orderVerified = true;
    },
    verifyUpload: (state) => {
      state.imageUploaded = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectOrder, removeOrder, verifyOrder, verifyUpload } =
  orderSlice.actions;

export default orderSlice.reducer;
