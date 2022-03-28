import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	status: false,
	message: "",
	showUpdatePassForm: false,
	email: "",
};
const passwordReset = createSlice({
	name: "passwordReset",
	initialState,
	reducers: {
		otpReqPending: state => {
			state.isLoading = true;
		},
		otpReqSuccess: (state, { payload }) => {
			state.isLoading = false;
			state.status = true;
			state.message = payload.message;
			state.email = payload.email;
			state.showUpdatePassForm = true;
		},
		updatePassSuccess: (state, { payload }) => {
			state.isLoading = false;
			state.status = true;
			state.message = payload;
			
		},
		otpReqFail: (state, { payload }) => {
			state.isLoading = false;
			state.status = false;
			state.message = payload;
		},
	},
});

export const {
	otpReqPending,
	otpReqSuccess,
	otpReqFail,
	updatePassSuccess,
} = passwordReset.actions;
export default passwordReset.reducer;