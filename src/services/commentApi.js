import forumDicoding from "../api/forumDicoding";

const commentApi = {
	async createComment({ content, threadId }) {
		try {
			const response = await forumDicoding.post(
				`/threads/${threadId}/comments`,
				{
					content,
				}
			);
			return response.data.data.comment;
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to create comment"
			);
		}
	},

	async upVoteComment(threadId, commentId) {
		try {
			const response = await forumDicoding.post(
				`/threads/${threadId}/comments/${commentId}/up-vote`
			);
			return response.data.data.vote;
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to upvote comment"
			);
		}
	},

	async downVoteComment(threadId, commentId) {
		try {
			const response = await forumDicoding.post(
				`/threads/${threadId}/comments/${commentId}/down-vote`
			);
			return response.data.data.vote;
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to downvote comment"
			);
		}
	},

	async neutralVoteComment(threadId, commentId) {
		try {
			const response = await forumDicoding.post(
				`/threads/${threadId}/comments/${commentId}/neutral-vote`
			);
			return response.data.data.vote;
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to neutralize vote"
			);
		}
	},
};

export default commentApi;
