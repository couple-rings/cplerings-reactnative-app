import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConversationState {
  //   conversationsList: IConversation[];

  currentConversation: IConversation;

  notificationList: string[];
}

const initialState: ConversationState = {
  //   conversationsList: [],

  currentConversation: {
    _id: "",
    participants: [],
  },

  notificationList: [],
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    // saveConversations: (state, { payload }: PayloadAction<IConversation[]>) => {
    //   state.conversationsList = payload;
    // },

    selectConversation: (state, { payload }: PayloadAction<IConversation>) => {
      const { latestMessage, notifiedUsers, ...rest } = payload;
      state.currentConversation = rest;
    },

    unSelectConversation: (state) => {
      state.currentConversation = initialState.currentConversation;
    },

    saveNotifications: (state, { payload }: PayloadAction<string[]>) => {
      state.notificationList = payload;
    },

    removeConversations: (state) => {
      //   state.conversationsList = [];
      state.notificationList = [];
      state.currentConversation = initialState.currentConversation;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  //   saveConversations,
  unSelectConversation,
  selectConversation,
  saveNotifications,
  removeConversations,
} = conversationSlice.actions;

export default conversationSlice.reducer;
