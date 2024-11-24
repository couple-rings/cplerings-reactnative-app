import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MessageState {
  messagesList: IMessage[];
}

const initialState: MessageState = {
  messagesList: [],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    saveMessages: (state, { payload }: PayloadAction<IMessage[]>) => {
      state.messagesList = payload;
    },
    removeMessages: (state) => {
      state.messagesList = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveMessages, removeMessages } = messageSlice.actions;

export default messageSlice.reducer;
