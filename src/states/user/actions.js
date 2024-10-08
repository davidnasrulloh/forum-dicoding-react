import { hideLoading, showLoading } from "react-redux-loading-bar";
import authApi from "../../services/authApi";

const ActionType = {
	RECEIVE_USERS: "users/receive",
	ERROR_RECEIVE_USERS: "users/errorReceive",
};

const receiveUsersActionCreator = (users) => ({
	type: ActionType.RECEIVE_USERS,
	payload: {
		users,
	},
});

const asyncRegisterUser =
	({ name, email, password }) =>
	async (dispatch) => {
		dispatch(showLoading());
		try {
			await authApi.register({ name, email, password });
		} catch (error) {
			alert(error.response.data.message);
		}
		dispatch(hideLoading());
	};

export { ActionType, receiveUsersActionCreator, asyncRegisterUser };
