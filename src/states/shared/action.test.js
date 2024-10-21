import asyncPopulateUsersAndThreads, {
	showLoading,
	hideLoading,
} from "./actions";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { receiveUsersActionCreator } from "../user/actions";
import { receiveThreadsActionCreator } from "../threads/actions";
import authApi from "../../services/authApi";
import threadApi from "../../services/threadApi";

vi.mock("../../api/forumDicoding");

// Test scenario: asyncPopulateUsersAndThreads Testing
describe("asyncPopulateUsersAndThreads", async () => {
	// Mocking the API methods
	beforeEach(() => {
		authApi.getAllUsers = vi
			.fn()
			.mockResolvedValue([{ id: 1, name: "David" }]);
		threadApi.getAllThreads = vi
			.fn()
			.mockResolvedValue([{ id: 1, title: "Thread 1" }]);
	});

	afterEach(() => {
		// Bersihkan setelah test
		vi.clearAllMocks();
	});

	// Test scenario: asyncPopulateUsersAndThreads should dispatch the correct actions and call the API methods
	it("should dispatch the correct actions and call the API methods", async () => {
		const users = [{ id: 1, name: "David" }];
		const threads = [{ id: 1, title: "Thread 1" }];

		const dispatch = vi.fn();

		// Memanggil asyncPopulateUsersAndThreads dengan dispatch
		await asyncPopulateUsersAndThreads()(dispatch);

		// Verifikasi apakah API benar-benar dipanggil
		expect(authApi.getAllUsers).toHaveBeenCalled();
		expect(threadApi.getAllThreads).toHaveBeenCalled();

		// Verifikasi apakah dispatch menerima data yang benar
		expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(users));
		expect(dispatch).toHaveBeenCalledWith(
			receiveThreadsActionCreator(threads)
		);

		// Pastikan hideLoading dipanggil
		expect(dispatch).toHaveBeenCalledWith(hideLoading());
	});

	// Test scenario: asyncPopulateUsersAndThreads should dispatch hideLoading even if an error occurs
	it("should dispatch hideLoading even if an error occurs", async () => {
		const dispatch = vi.fn();
		const error = new Error("authApi error");

		// Mocking the authApi error
		authApi.getAllUsers = vi.fn().mockRejectedValueOnce(error);

		await asyncPopulateUsersAndThreads()(dispatch);

		expect(dispatch).toHaveBeenCalledWith(showLoading());
		expect(authApi.getAllUsers).toHaveBeenCalled();
		expect(threadApi.getAllThreads).not.toHaveBeenCalled();
		expect(dispatch).toHaveBeenCalledWith(hideLoading());
	});
});
