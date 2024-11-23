import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderState {
  currentOrder: ITransportOrder | null;

  orderVerified: boolean;
}

const initialState: OrderState = {
  currentOrder: null,

  orderVerified: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    selectOrder: (state, { payload }: PayloadAction<ITransportOrder>) => {
      state.currentOrder = payload;
    },
    removeOrder: (state) => {
      state.currentOrder = null;
    },
    verifyOrder: (state) => {
      state.orderVerified = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectOrder, removeOrder, verifyOrder } = orderSlice.actions;

export default orderSlice.reducer;
