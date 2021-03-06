import {
	otpReqPending,
	otpReqSuccess,
	otpReqFail,
	updatePassSuccess,
} from "../slices/resetPassSlice";

import { reqPasswordOtp, updateUserPassword } from "../../api/passwordApi";

export const sendPasswordResetOtp = (email) => async (dispatch) => {
	try {
		dispatch(otpReqPending());

		const { status, message } = await reqPasswordOtp(email);

		if (status === true) {
			return dispatch(otpReqSuccess({ message, email }));
		}

		dispatch(otpReqFail(message));
	} catch (error) {
		dispatch(otpReqFail(error.message));
	}
};

export const updatePassword = (frmData) => async (dispatch) => {
	try {
		dispatch(otpReqPending());

		const { status, message } = await updateUserPassword(frmData);

		if (status === true) {
			return dispatch(updatePassSuccess(message));
		}

		dispatch(otpReqFail(message));
	} catch (error) {
		dispatch(otpReqFail(error.message));
	}
};