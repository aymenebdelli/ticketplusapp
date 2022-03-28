import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPending: false,
  error: "",
  successMsg: "",
};
const newTicketSlice = createSlice({
  name: "newTicket",
  initialState,
  reducers: {
    openNewTicketPending: (state) => {
      state.isPending = true;
    },
    openNewTicketSuccess: (state, { payload }) => {
      state.isPending = false;
      state.successMsg = payload;
    },
    openNewTicketFail: (state, { payload }) => {
      state.isPending = true;
      state.error = payload;
    },
    restSuccessMSg: (state) => {
      state.isPending = true;
      state.successMsg = "";
    },
  },
});

export const {
  openNewTicketPending,
  openNewTicketSuccess,
  openNewTicketFail,
  restSuccessMSg,
} = newTicketSlice.actions;

export default newTicketSlice.reducer;