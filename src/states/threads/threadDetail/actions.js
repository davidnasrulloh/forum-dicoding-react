import { hideLoading, showLoading } from "react-redux-loading-bar";
import threadApi from "../../../services/threadApi";
import commentApi from "../../../services/commentApi";

const ActionType = {
	RECEIVE_THREAD_DETAIL: "RECEIVE_THREAD_DETAIL",
	UP_VOTE_THREAD_DETAIL: "UP_VOTE_THREAD_DETAIL",
	DOWN_VOTE_THREAD_DETAIL: "DOWN_VOTE_THREAD_DETAIL",
	NEUTRALIZE_VOTE_THREAD_DETAIL: "NEUTRALIZE_VOTE_THREAD_DETAIL",
	CREATE_COMMENT: "CREATE_COMMENT",
	UP_VOTE_COMMENT: "UP_VOTE_COMMENT",
	DOWN_VOTE_COMMENT: "DOWN_VOTE_COMMENT",
	NEUTRALIZE_VOTE_COMMENT: "NEUTRALIZE_VOTE_COMMENT",
};

function receiveThreadDetailActionCreator(threadDetail) {
	return {
		type: ActionType.RECEIVE_THREAD_DETAIL,
		payload: {
			threadDetail,
		},
	};
}
function upVoteThreadDetailActionCreator(userId) {
	return {
		type: ActionType.UP_VOTE_THREAD_DETAIL,
		payload: {
			userId,
		},
	};
}

function downVoteThreadDetailActionCreator(userId) {
	return {
		type: ActionType.DOWN_VOTE_THREAD_DETAIL,
		payload: {
			userId,
		},
	};
}

function neutralizeVoteThreadDetailActionCreator(userId) {
	return {
		type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL,
		payload: {
			userId,
		},
	};
}
function createCommentActionCreator(comment) {
	return {
		type: ActionType.CREATE_COMMENT,
		payload: {
			comment,
		},
	};
}

function upVoteCommentActionCreator(commentId, userId) {
	return {
		type: ActionType.UP_VOTE_COMMENT,
		payload: {
			commentId,
			userId,
		},
	};
}

function downVoteCommentActionCreator(commentId, userId) {
	return {
		type: ActionType.DOWN_VOTE_COMMENT,
		payload: {
			commentId,
			userId,
		},
	};
}

function neutralizeVoteCommentActionCreator(commentId, userId) {
	return {
		type: ActionType.NEUTRALIZE_VOTE_COMMENT,
		payload: {
			commentId,
			userId,
		},
	};
}

function asyncReceiveThreadDetail(threadId) {
	return async (dispatch) => {
		dispatch(showLoading());
		try {
			const threadDetail = await threadApi.getThreadDetail(threadId);
			dispatch(receiveThreadDetailActionCreator(threadDetail));
		} catch (error) {
			console.log(error);
		}
		dispatch(hideLoading());
	};
}

function asyncUpVoteThreadDetail() {
	return async (dispatch, getState) => {
		const { threadDetail, authUser } = getState();
		dispatch(upVoteThreadDetailActionCreator(authUser.id));
		try {
			await threadApi.upVoteThread(threadDetail.id);
		} catch (error) {
			console.log(error);
		}
	};
}
function asyncDownVoteThreadDetail() {
	return async (dispatch, getState) => {
		const { threadDetail, authUser } = getState();
		dispatch(downVoteThreadDetailActionCreator(authUser.id));
		try {
			await threadApi.downVoteThread(threadDetail.id);
		} catch (error) {
			console.log(error);
		}
	};
}

function asyncNeutralizeVoteThreadDetail() {
	return async (dispatch, getState) => {
		const { threadDetail, authUser } = getState();
		dispatch(neutralizeVoteThreadDetailActionCreator(authUser.id));
		try {
			await threadApi.neutralVoteComment(threadDetail.id);
		} catch (error) {
			console.log(error);
		}
	};
}

function asyncCreateComment({ content }) {
	return async (dispatch, getState) => {
		dispatch(showLoading());
		const { threadDetail } = getState();
		try {
			const comment = await commentApi.createComment({
				content,
				threadId: threadDetail.id,
			});
			dispatch(createCommentActionCreator(comment));
		} catch (error) {
			console.log(error);
		}
		dispatch(hideLoading());
	};
}

function asyncUpVoteComment(commentId) {
	return async (dispatch, getState) => {
		const { authUser, threadDetail } = getState();
		dispatch(upVoteCommentActionCreator(commentId, authUser.id));
		try {
			await threadApi.upVoteComment(threadDetail.id, commentId);
		} catch (error) {
			console.log(error);
		}
	};
}

function asyncDownVoteComment(commentId) {
	return async (dispatch, getState) => {
		const { authUser, threadDetail } = getState();
		dispatch(downVoteCommentActionCreator(commentId, authUser.id));
		try {
			await threadApi.downVoteComment(threadDetail.id, commentId);
		} catch (error) {
			console.log(error);
		}
	};
}

function asyncNeutralizeVoteComment(commentId) {
	return async (dispatch, getState) => {
		const { authUser, threadDetail } = getState();
		dispatch(neutralizeVoteCommentActionCreator(commentId, authUser.id));
		try {
			await threadApi.neutralVoteComment(threadDetail.id, commentId);
		} catch (error) {
			console.log(error);
		}
	};
}

export {
	ActionType,
	asyncReceiveThreadDetail,
	asyncUpVoteThreadDetail,
	asyncDownVoteThreadDetail,
	asyncNeutralizeVoteThreadDetail,
	asyncCreateComment,
	asyncUpVoteComment,
	asyncDownVoteComment,
	asyncNeutralizeVoteComment,
};
