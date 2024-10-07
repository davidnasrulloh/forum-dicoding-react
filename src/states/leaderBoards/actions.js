import { hideLoading, showLoading } from "react-redux-loading-bar";
import leaderboardApi from "../../services/leaderboardApi";

const ActionType = {
	RECEIVE_LEADERBOARDS: "leaderboards/receive",
};

const receiveLeaderboardsActionCreator = (leaderboards) => ({
	type: ActionType.RECEIVE_LEADERBOARDS,
	payload: {
		leaderboards,
	},
});

const asyncPopulateLeaderboards = () => async (dispatch) => {
	dispatch(showLoading());
	try {
		const leaderboards = await leaderboardApi.getLeaderBoards();
		dispatch(receiveLeaderboardsActionCreator(leaderboards));
	} catch (error) {
		console.log(error);
	}
	dispatch(hideLoading());
};

export {
	ActionType,
	receiveLeaderboardsActionCreator,
	asyncPopulateLeaderboards,
	showLoading,
	hideLoading,
};
