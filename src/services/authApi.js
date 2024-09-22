import forumDicoding from "../api/forumDicoding";

const authApi = {
	async register({ name, email, password }) {
		try {
			const response = await forumDicoding.post("/register", {
				name,
				email,
				password,
			});
			return response.data.data.user;
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to register"
			);
		}
	},

	async login({ email, password }) {
		try {
			const response = await forumDicoding.post("/login", {
				email,
				password,
			});
			const { token } = response.data.data;
			return token;
		} catch (error) {
			throw new Error(error.response?.data?.message || "Failed to login");
		}
	},

	setAccessToken(token) {
		localStorage.setItem("accessToken", token);
	},

	getAccessToken() {
		return localStorage.getItem("accessToken");
	},

	async getProfile() {
		try {
			const response = await forumDicoding.get("/users/me");
			return response.data.data.user;
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to fetch profile"
			);
		}
	},

	async getAllUsers() {
		try {
			const response = await forumDicoding.get("/users");
			return response.data.data.users;
		} catch (error) {
			throw new Error(
				error.response?.data?.message || "Failed to fetch users"
			);
		}
	},
};

export default authApi;
