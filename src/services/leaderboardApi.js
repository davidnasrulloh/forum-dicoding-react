import forumDicoding from "../api/forumDicoding";

const leaderboardApi = {
	async getLeaderBoards() {
		try {
			const response = await forumDicoding.get("/leaderboards");
			return response.data.data.leaderboards;
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to fetch leaderboards"
			);
		}
	},
};

export default leaderboardApi;
