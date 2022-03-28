import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pending: false,
  status: false,
  message: "",
};

const userRegisterSlice = createSlice({
  name: "userRegistration",
  initialState,
  reducers: {
    registrationPending: (state) => {
      state.pending = true;
    },
    registrationFullfil: (state, { payload }) => {
      state.pending = false;
      state.status = true;
      state.message = payload;
    },
    registrationRejected: (state, { payload }) => {
      state.pending = false;
      state.status = false;
      state.message = payload;
    },
  },
});


export const {
  registrationFullfil,registrationPending,registrationRejected
} = userRegisterSlice.actions;

export default userRegisterSlice.reducer;