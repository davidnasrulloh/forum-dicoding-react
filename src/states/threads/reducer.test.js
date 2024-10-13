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

describe("threadsReducers function", () => {
	it("should return the initial state when given by unknown action", () => {
		// arrange
		const initialState = [];
		const action = { type: "UNKNOWN" };

		// action
		const nextState = threadsReducer(initialState, action);

		// assert
		expect(nextState).toEqual(initialState);
	});

	it("should return the thread when given by RECEIVE_THREADS action", () => {
		// arrange
		const initialState = [];
		const action = {
			type: ActionType.RECEIVE_THREADS,
			payload: {
				threads: [objectPertama],
			},
		};

		// action
		const nextState = threadsReducer(initialState, action);

		// assert
		expect(nextState).toEqual(action.payload.threads);
	});

	it("should return new thread when given by CREATE_THREAD action", () => {
		// arrange
		const initialState = [objectPertama];
		const action = {
			type: ActionType.CREATE_THREAD,
			payload: {
				thread: objectKedua,
			},
		};
		// action
		const nextState = threadsReducer(initialState, action);

		// assert
		expect(nextState).toEqual([action.payload.thread, ...initialState]);
	});

	it("should return the thread with toggled UpVote when given by UP_VOTE_THREAD action", () => {
		// arrange
		const initialState = [objectPertama];

		const action = {
			type: ActionType.UP_VOTE_THREAD,
			payload: {
				threadId: "thread-1",
				userId: "users-1",
			},
		};
		// action
		const nextState = threadsReducer(initialState, action);

		// assert
		expect(nextState).toEqual([
			{
				...initialState[0],
				upVotesBy: [action.payload.userId],
				downVotesBy: [],
			},
		]);
	});

	it("should return the thread with toggled DownVote when given by DOWN_VOTE_THREAD action", () => {
		const initialState = [objectPertama];

		const action = {
			type: ActionType.DOWN_VOTE_THREAD,
			payload: {
				threadId: "thread-1",
				userId: "users-1",
			},
		};
		// action
		const nextState = threadsReducer(initialState, action);

		// assert
		expect(nextState).toEqual([
			{
				...initialState[0],
				upVotesBy: [],
				downVotesBy: [action.payload.userId],
			},
		]);
	});

	it("should return the thread without toggled UpVote and DownVote when given by NEUTRALIZE_VOTE_THREAD action", () => {
		const initialState = [objectPertama];

		const action = {
			type: ActionType.NETURALIZE_VOTE_THREAD,
			payload: {
				threadId: "thread-1",
				userId: "users-1",
			},
		};
		// action
		const nextState = threadsReducer(initialState, action);

		// assert
		expect(nextState).toEqual([
			{
				...initialState[0],
				upVotesBy: [],
				downVotesBy: [],
			},
		]);
	});
});
