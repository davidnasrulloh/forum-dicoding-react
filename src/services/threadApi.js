import forumDicoding from "../api/forumDicoding";

const threadApi = {
	async getAllThreads() {
		try {
			const response = await forumDicoding.get("/threads");
			return response.data.data.threads;
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to fetch threads"
			);
		}
	},

	async getThreadDetail(id) {
		try {
			const response = await forumDicoding.get(`/threads/${id}`);
			return response.data.data.detailThread;
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to fetch thread detail"
			);
		}
	},

	async createThread({ title, body, category }) {
		try {
			const response = await forumDicoding.post("/threads", {
				title,
				body,
				category,
			});
			return response.data.data.thread;
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to create thread"
			);
		}
	},

	async upVoteThread(id) {
		try {
			await forumDicoding.post(`/threads/${id}/up-vote`);
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to upvote thread"
			);
		}
	},

	async downVoteThread(id) {
		try {
			await forumDicoding.post(`/threads/${id}/down-vote`);
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to downvote thread"
			);
		}
	},

	async neutralVoteThread(id) {
		try {
			await forumDicoding.post(`/threads/${id}/neutral-vote`);
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to neutralize vote"
			);
		}
	},
};

export default threadApi;
