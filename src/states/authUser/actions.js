import { hideLoading, showLoading } from "react-redux-loading-bar";
import authApi from "../../services/authApi";

const ActionType = {
	SET_AUTH_USER: "SET_AUTH_USER",
	UNSET_AUTH_USER: "UNSET_AUTH_USER",
};

const setAuthUser = (authUser) => ({
	type: ActionType.SET_AUTH_USER,
	payload: {
		authUser,
	},
});

const unsetAuthUser = () => ({
	type: ActionType.UNSET_AUTH_USER,
});

const asyncSetAuthUser =
	({ email, password }) =>
	async (dispatch) => {
		dispatch(showLoading());
		try {
			const token = await authApi.login({ email, password });
			authApi.setAccessToken(token);
			const authUserResponse = await authApi.getProfile();
			dispatch(setAuthUser(authUserResponse));
		} catch (error) {
			console.log(error);
		}
		dispatch(hideLoading());
	};

const asyncUnsetAuthUser = () => async (dispatch) => {
	dispatch(unsetAuthUser());
	authApi.setAccessToken("");
};

export {
	ActionType,
	setAuthUser,
	unsetAuthUser,
	asyncSetAuthUser,
	asyncUnsetAuthUser,
};
