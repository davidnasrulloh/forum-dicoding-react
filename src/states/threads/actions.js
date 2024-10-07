import { hideLoading, showLoading } from "react-redux-loading-bar";
import threadApi from "../../services/threadApi";

const ActionType = {
	RECEIVE_THREADS: "threads/receive",
	CREATE_THREAD: "threads/create",
	UP_VOTE_THREAD: "threads/upVote",
	DOWN_VOTE_THREAD: "threads/downVote",
	NETURALIZE_VOTE_THREAD: "threads/neutralizeVote",
};

const receiveThreadsActionCreator = (threads) => ({
	type: ActionType.RECEIVE_THREADS,
	payload: {
		threads,
	},
});

const createThreadActionCreator = (thread) => ({
	type: ActionType.CREATE_THREAD,
	payload: {
		thread,
	},
});

const upVoteThreadActionCreator = ({ threadId, userId }) => ({
	type: ActionType.UP_VOTE_THREAD,
	payload: {
		threadId,
		userId,
	},
});

const downVoteThreadActionCreator = ({ threadId, userId }) => ({
	type: ActionType.DOWN_VOTE_THREAD,
	payload: {
		threadId,
		userId,
	},
});

const neturalizeVoteThreadActionCreator = ({ threadId, userId }) => ({
	type: ActionType.NETURALIZE_VOTE_THREAD,
	payload: {
		threadId,
		userId,
	},
});

const asyncCreateThread =
	({ title, body, category }) =>
	async (dispatch) => {
		dispatch(showLoading());
		try {
			const thread = await threadApi.createThread({
				title,
				body,
				category,
			});
			dispatch(createThreadActionCreator(thread));
		} catch (error) {
			console.log(error);
		}
		dispatch(hideLoading());
	};

const asyncUpVoteThread = (threadId) => async (dispatch, getState) => {
	const { authUser } = getState();
	dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
	try {
		await threadApi.upVoteThread(threadId);
	} catch (error) {
		console.log(error);
		dispatch(
			downVoteThreadActionCreator({ threadId, userId: authUser.id })
		);
	}
};

const asyncDownVoteThread = (threadId) => async (dispatch, getState) => {
	const { authUser } = getState();
	dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
	try {
		await threadApi.downVoteThread(threadId);
	} catch (error) {
		console.log(error);
		dispatch(
			downVoteThreadActionCreator({ threadId, userId: authUser.id })
		);
	}
};

const asyncNeturalizeVoteThread = (threadId) => async (dispatch, getState) => {
	const { authUser } = getState();
	dispatch(
		neturalizeVoteThreadActionCreator({ threadId, userId: authUser.id })
	);
	try {
		await threadApi.neutralVoteThread(threadId);
	} catch (error) {
		console.log(error);
		dispatch(
			neturalizeVoteThreadActionCreator({ threadId, userId: authUser.id })
		);
	}
};

export {
	ActionType,
	receiveThreadsActionCreator,
	asyncCreateThread,
	asyncUpVoteThread,
	asyncDownVoteThread,
	asyncNeturalizeVoteThread,
};
