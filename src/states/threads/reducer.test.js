import { describe, expect, it } from "vitest";
import threadsReducer from "./reducer";
import { ActionType } from "./actions";

const objectPertama = {
	id: "thread-1",
	title: "Thread Pertama",
	body: "Ini adalah thread pertama",
	category: "Umum",
	createdAt: "2024-10-11T07:00:00.000Z",
	ownerId: "users-1",
	upVotesBy: [],
	downVotesBy: [],
};

const objectKedua = {
	id: "thread-2",
	title: "Thread Kedua",
	body: "Ini adalah thread kedua",
	category: "Umum",
	createdAt: "2024-10-11T07:00:00.000Z",
	ownerId: "users-2",
	upVotesBy: [],
	downVotesBy: [],
};

// Test scenario: threadsReducers Testing
describe("threadsReducers function", () => {
	// Test scenario: Return initial state for unknown action
	it("should return the initial state when given by unknown action", () => {
		// Arrange: Set initial state and unknown action
		const initialState = [];
		const action = { type: "UNKNOWN" };

		// Action: Call threadsReducer with initialState and action
		const nextState = threadsReducer(initialState, action);

		// Assert: Ensure state remains unchanged
		expect(nextState).toEqual(initialState);
	});

	// Test scenario: Handle RECEIVE_THREADS action
	it("should return the thread when given by RECEIVE_THREADS action", () => {
		// Arrange: Set initial state and RECEIVE_THREADS action with a thread payload
		const initialState = [];
		const action = {
			type: ActionType.RECEIVE_THREADS,
			payload: {
				threads: [objectPertama],
			},
		};

		// Action: Call threadsReducer with initialState and action
		const nextState = threadsReducer(initialState, action);

		// Assert: Ensure new state contains the received threads
		expect(nextState).toEqual(action.payload.threads);
	});

	// Test scenario: Handle CREATE_THREAD action
	it("should return new thread when given by CREATE_THREAD action", () => {
		// Arrange: Set initial state and CREATE_THREAD action with a new thread payload
		const initialState = [objectPertama];
		const action = {
			type: ActionType.CREATE_THREAD,
			payload: {
				thread: objectKedua,
			},
		};

		// Action: Call threadsReducer with initialState and action
		const nextState = threadsReducer(initialState, action);

		// Assert: Ensure the new thread is added to the state
		expect(nextState).toEqual([action.payload.thread, ...initialState]);
	});

	// Test scenario: Handle UP_VOTE_THREAD action
	it("should return the thread with toggled UpVote when given by UP_VOTE_THREAD action", () => {
		// Arrange: Set initial state and UP_VOTE_THREAD action with a user voting up
		const initialState = [objectPertama];

		const action = {
			type: ActionType.UP_VOTE_THREAD,
			payload: {
				threadId: "thread-1",
				userId: "users-1",
			},
		};

		// Action: Call threadsReducer with initialState and action
		const nextState = threadsReducer(initialState, action);

		// Assert: Ensure the upVotesBy array is updated with the user ID
		expect(nextState).toEqual([
			{
				...initialState[0],
				upVotesBy: [action.payload.userId],
				downVotesBy: [],
			},
		]);
	});

	// Test scenario: Handle DOWN_VOTE_THREAD action
	it("should return the thread with toggled DownVote when given by DOWN_VOTE_THREAD action", () => {
		// Arrange: Set initial state and DOWN_VOTE_THREAD action with a user voting down
		const initialState = [objectPertama];

		const action = {
			type: ActionType.DOWN_VOTE_THREAD,
			payload: {
				threadId: "thread-1",
				userId: "users-1",
			},
		};

		// Action: Call threadsReducer with initialState and action
		const nextState = threadsReducer(initialState, action);

		// Assert: Ensure the downVotesBy array is updated with the user ID
		expect(nextState).toEqual([
			{
				...initialState[0],
				upVotesBy: [],
				downVotesBy: [action.payload.userId],
			},
		]);
	});

	// Test scenario: Handle NEUTRALIZE_VOTE_THREAD action
	it("should return the thread without toggled UpVote and DownVote when given by NEUTRALIZE_VOTE_THREAD action", () => {
		// Arrange: Set initial state and NEUTRALIZE_VOTE_THREAD action with a user neutralizing vote
		const initialState = [objectPertama];

		const action = {
			type: ActionType.NETURALIZE_VOTE_THREAD,
			payload: {
				threadId: "thread-1",
				userId: "users-1",
			},
		};

		// Action: Call threadsReducer with initialState and action
		const nextState = threadsReducer(initialState, action);

		// Assert: Ensure both upVotesBy and downVotesBy arrays are cleared
		expect(nextState).toEqual([
			{
				...initialState[0],
				upVotesBy: [],
				downVotesBy: [],
			},
		]);
	});
});
