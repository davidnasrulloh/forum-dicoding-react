import { hideLoading, showLoading } from "react-redux-loading-bar";
import {
	asyncPopulateLeaderboards,
	receiveLeaderboardsActionCreator,
} from "./actions";
import { expect, it, vi } from "vitest";
import leaderboardApi from "../../services/leaderboardApi";

// Test scenario: Dispatch actions for successful data fetch
it("should dispatch action correctly when data fetching success", async () => {
	// Arrange: Mock successful leaderboard API response
	const fakeLeaderboards = [
		{
			user: {
				id: "users-1",
				name: "David Nasrulloh",
				email: "david@example.com",
				avatar: "https://generated-image-url.jpg",
			},
			score: 10,
		},
	];

	leaderboardApi.getLeaderBoards = () => Promise.resolve(fakeLeaderboards);

	const dispatch = vi.fn();

	// Action: Call asyncPopulateLeaderboards
	await asyncPopulateLeaderboards()(dispatch);

	// Assert: Ensure correct dispatch of showLoading, receiveLeaderboards, and hideLoading
	expect(dispatch).toHaveBeenCalledWith(showLoading());
	expect(dispatch).toHaveBeenCalledWith(
		receiveLeaderboardsActionCreator(fakeLeaderboards)
	);
	expect(dispatch).toHaveBeenCalledWith(hideLoading());
});

// Test scenario: Dispatch actions and log error for failed data fetch
it("should dispatch action and log error when data fetching failed", async () => {
	// Arrange: Mock API failure
	const fakeError = new Error("Something went wrong");

	leaderboardApi.getLeaderBoards = () => Promise.reject(fakeError);

	const dispatch = vi.fn();
	const consoleSpy = vi.spyOn(console, "log").mockImplementation();

	// Action: Call asyncPopulateLeaderboards
	await asyncPopulateLeaderboards()(dispatch);

	// Assert: Ensure correct dispatch of showLoading, log error, and hideLoading
	expect(dispatch).toHaveBeenCalledWith(showLoading());
	expect(consoleSpy).toHaveBeenCalledWith(fakeError);
	expect(dispatch).toHaveBeenCalledWith(hideLoading());

	// Cleanup: Restore console log after test
	consoleSpy.mockRestore();
});
