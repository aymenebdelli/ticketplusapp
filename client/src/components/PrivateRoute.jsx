import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { DefaultLayout } from './DefaultLayout'
import { useSelector, useDispatch } from 'react-redux'
import { loginSuccess } from '../redux/slices/loginSlice'
import { getUserProfile } from "../redux/actions/userAction";

import { fetchNewAccessJWT } from "../api/userApi";

// const isAuth = false
export const PrivateRoute = ({ children, ...rest }) => {
	const dispatch = useDispatch();
	const { isAuth } = useSelector(state => state.login);
	const { user } = useSelector(state => state.user);

	useEffect(() => {
		const updateAccessJWT = async () => {
			const result = await fetchNewAccessJWT();
			result && dispatch(loginSuccess());
		};

		!user._id && dispatch(getUserProfile());

		!sessionStorage.getItem("accessJWT") &&
			localStorage.getItem("crmSite") &&
			updateAccessJWT();

		!isAuth && sessionStorage.getItem("accessJWT") && dispatch(loginSuccess());
	}, [dispatch, isAuth, user._id])

	return (
		<Route
			{...rest}
			render={() =>
				isAuth ? <DefaultLayout>{children}</DefaultLayout> : <Redirect to='/' />
			}
		/>
	)
}
