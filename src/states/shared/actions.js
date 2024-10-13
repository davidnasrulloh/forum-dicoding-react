import { hideLoading, showLoading } from "react-redux-loading-bar";

import { receiveThreadsActionCreator } from "../threads/actions";
import authApi from "../../services/authApi";
import threadApi from "../../services/threadApi";
import { receiveUsersActionCreator } from "../user/actions";

function asyncPopulateUsersAndThreads() {
	return async (dispatch) => {
		dispatch(showLoading());
		try {
			const users = await authApi.getAllUsers();
			const threads = await threadApi.getAllThreads();

			dispatch(receiveUsersActionCreator(users));
			dispatch(receiveThreadsActionCreator(threads));
			dispatch(hideLoading());
		} catch (error) {
			console.log(error);
		}
		dispatch(hideLoading());
	};
}

export { hideLoading, showLoading };
export default asyncPopulateUsersAndThreads;
