import { describe, expect, it } from "vitest";
import threadDetailReducer from "./reducer";
import { ActionType } from "./actions";

const threadDummyObject = {
	id: "thread-1",
	title: "Thread Pertama",
	body: "Ini adalah thread pertama",
	category: "Umum",
	createdAt: "2024-10-11T07:00:00.000Z",
	owner: {},
	upVotesBy: [],
	downVotesBy: [],
	comments: [],
	created: "2024-10-11T10:06:55.588Z",
};

// Test scenario: threadDetailReducers Testing
describe("threadDetailReducers function", () => {
	// Test scenario: Return initial state for unknown action
	it("should return the initial state when given by unknown action", () => {
		const initialState = [];
		const action = { type: "UNKNOWN" };

		// Action: Call threadDetailReducer with initialState and action
		const nextState = threadDetailReducer(initialState, action);

		// Assert: Ensure state remains unchanged
		expect(nextState).toEqual(initialState);
	});

	// Test scenario: Handle RECEIVE_THREAD_DETAIL action
	it("should return the thread detail when given by RECEIVE_THREAD_DETAIL action", () => {
		const initialState = [];
		const action = {
			type: ActionType.RECEIVE_THREAD_DETAIL,
			payload: {
				threadDetail: threadDummyObject,
			},
		};

		// Action: Call threadDetailReducer with initialState and action
		const nextState = threadDetailReducer(initialState, action);

		// Assert: Ensure state contains the received thread detail
		expect(nextState).toEqual(action.payload.threadDetail);
	});

	// Test scenario: Handle UP_VOTE_THREAD_DETAIL action
	it("should return the thread detail with toggled UpVote when given by UP_VOTE_THREAD_DETAIL action", () => {
		const initialState = threadDummyObject;
		const action = {
			type: ActionType.UP_VOTE_THREAD_DETAIL,
			payload: {
				userId: "user-1",
			},
		};

		// Action: Call threadDetailReducer with initialState and action
		const nextState = threadDetailReducer(initialState, action);

		// Assert: Ensure the upVotesBy array is updated with the user ID
		expect(nextState).toEqual({
			...initialState,
			upVotesBy: [action.payload.userId],
			downVotesBy: [],
		});
	});

	// Test scenario: Handle DOWN_VOTE_THREAD_DETAIL action
	it("should return the thread detail with toggled DownVote when given by DOWN_VOTE_THREAD_DETAIL action", () => {
		const initialState = threadDummyObject;
		const action = {
			type: ActionType.DOWN_VOTE_THREAD_DETAIL,
			payload: {
				userId: "user-1",
			},
		};

		// Action: Call threadDetailReducer with initialState and action
		const nextState = threadDetailReducer(initialState, action);

		// Assert: Ensure the downVotesBy array is updated with the user ID
		expect(nextState).toEqual({
			...initialState,
			upVotesBy: [],
			downVotesBy: [action.payload.userId],
		});
	});

	// Test scenario: Handle NEUTRALIZE_VOTE_THREAD_DETAIL action
	it("should return the thread detail without toggled UpVote and DownVote when given by NEUTRALIZE_VOTE_THREAD_DETAIL action", () => {
		const initialState = threadDummyObject;
		const action = {
			type: "threadDetail/neutralizeVote",
			payload: {
				userId: "user-1",
			},
		};

		// Action: Call threadDetailReducer with initialState and action
		const nextState = threadDetailReducer(initialState, action);

		// Assert: Ensure both upVotesBy and downVotesBy arrays are cleared
		expect(nextState).toEqual({
			...initialState,
			upVotesBy: [],
			downVotesBy: [],
		});
	});

	// Test scenario: Handle CREATE_COMMENT action
	it("should return the thread detail with new comment when given by CREATE_COMMENT action", () => {
		const initialState = threadDummyObject;
		const action = {
			type: ActionType.CREATE_COMMENT,
			payload: {
				comment: {
					id: "comment-1",
					body: "Ini adalah comment pertama",
					owner: {},
					upVotesBy: [],
					downVotesBy: [],
					created: "2024-10-11T10:06:55.588Z",
				},
			},
		};

		// Action: Call threadDetailReducer with initialState and action
		const nextState = threadDetailReducer(initialState, action);

		// Assert: Ensure the new comment is added to the comments array
		expect(nextState).toEqual({
			...initialState,
			comments: [action.payload.comment, ...initialState.comments],
		});
	});

	// Test scenario: Handle UP_VOTE_COMMENT action
	it("should return the thread detail with UpVote toggled comment when given by UP_VOTE_COMMENT action", () => {
		const initialState = {
			...threadDummyObject,
			comments: [
				{
					id: "comment-1",
					body: "Ini adalah comment pertama",
					owner: {
						id: "users-1",
						name: "David Nasrulloh",
						email: "david@example.com",
					},
					upVotesBy: [],
					downVotesBy: [],
					created: "2024-10-11T10:06:55.588Z",
				},
			],
		};

		const action = {
			type: ActionType.UP_VOTE_COMMENT,
			payload: {
				commentId: "comment-1",
				userId: "user-1",
			},
		};

		// Action: Call threadDetailReducer with initialState and action
		const nextState = threadDetailReducer(initialState, action);

		// Assert: Ensure the comment's upVotesBy array is updated
		expect(nextState).toEqual({
			...initialState,
			comments: [
				{
					...initialState.comments[0],
					upVotesBy: [action.payload.userId],
					downVotesBy: [],
				},
			],
		});
	});

	// Test scenario: Handle DOWN_VOTE_COMMENT action
	it("should return the thread detail with DownVote toggled comment when given by DOWN_VOTE_COMMENT action", () => {
		const initialState = {
			...threadDummyObject,
			comments: [
				{
					id: "comment-1",
					body: "Ini adalah comment pertama",
					owner: {
						id: "users-1",
						name: "David Nasrulloh",
						email: "david@example.com",
					},
					upVotesBy: [],
					downVotesBy: [],
					created: "2024-10-11T10:06:55.588Z",
				},
			],
		};

		const action = {
			type: ActionType.DOWN_VOTE_COMMENT,
			payload: {
				commentId: "comment-1",
				userId: "user-1",
			},
		};

		// Action: Call threadDetailReducer with initialState and action
		const nextState = threadDetailReducer(initialState, action);

		// Assert: Ensure the comment's downVotesBy array is updated
		expect(nextState).toEqual({
			...initialState,
			comments: [
				{
					...initialState.comments[0],
					upVotesBy: [],
					downVotesBy: [action.payload.userId],
				},
			],
		});
	});

	// Test scenario: Handle NEUTRALIZE_VOTE_COMMENT action
	it("should return the thread detail without toggled UpVote and DownVote comment when given by NEUTRALIZE_VOTE_COMMENT action", () => {
		const initialState = {
			...threadDummyObject,
			comments: [
				{
					id: "comment-1",
					body: "Ini adalah comment pertama",
					owner: {
						id: "users-1",
						name: "David Nasrulloh",
						email: "david@example.com",
					},
					upVotesBy: [],
					downVotesBy: [],
					created: "2024-10-11T10:06:55.588Z",
				},
			],
		};

		const action = {
			type: ActionType.NEUTRALIZE_VOTE_COMMENT,
			payload: {
				commentId: "comment-1",
				userId: "user-1",
			},
		};

		// Action: Call threadDetailReducer with initialState and action
		const nextState = threadDetailReducer(initialState, action);

		// Assert: Ensure both upVotesBy and downVotesBy arrays are cleared for the comment
		expect(nextState).toEqual({
			...initialState,
			comments: [
				{
					...initialState.comments[0],
					upVotesBy: [],
					downVotesBy: [],
				},
			],
		});
	});
});
