import { hideLoading, showLoading } from "react-redux-loading-bar";
import {
	asyncPopulateLeaderboards,
	receiveLeaderboardsActionCreator,
} from "./actions";
import { expect, it, vi } from "vitest";
import leaderboardApi from "../../services/leaderboardApi";

it("should dispatch action correctly when data fetching success", async () => {
	// arrange
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

	// action
	await asyncPopulateLeaderboards()(dispatch);

	// assert
	expect(dispatch).toHaveBeenCalledWith(showLoading());
	expect(dispatch).toHaveBeenCalledWith(
		receiveLeaderboardsActionCreator(fakeLeaderboards)
	);
	expect(dispatch).toHaveBeenCalledWith(hideLoading());
});

it("should dispatch action and log error when data fetching failed", async () => {
	// arrange
	const fakeError = new Error("Something went wrong");

	leaderboardApi.getLeaderBoards = () => Promise.reject(fakeError);

	const dispatch = vi.fn();
	const consoleSpy = vi.spyOn(console, "log").mockImplementation();

	// action
	await asyncPopulateLeaderboards()(dispatch);

	// assert
	expect(dispatch).toHaveBeenCalledWith(showLoading());
	expect(consoleSpy).toHaveBeenCalledWith(fakeError);
	expect(dispatch).toHaveBeenCalledWith(hideLoading());

	// cleanup
	consoleSpy.mockRestore();
});
