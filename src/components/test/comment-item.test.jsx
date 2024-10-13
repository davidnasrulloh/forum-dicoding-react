/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";
import CommentItem from "../comment/comment-item";

expect.extend(matchers);

describe("CommentItem component", () => {
	afterEach(() => {
		cleanup();
	});

	it("should render the comment item correctly", async () => {
		// Arrange
		const comment = {
			id: "1",
			content: "This is a sample comment.",
			createdAt: new Date().toISOString(),
			owner: {
				id: "1",
				name: "David Nasrulloh",
				avatar: "avatar.jpg",
			},
			upVotesBy: [],
			downVotesBy: [],
			upVote: vi.fn(),
			downVote: vi.fn(),
			neturalizeVote: vi.fn(),
			authUser: "auth-user",
		};

		// Action
		render(<CommentItem {...comment} />);

		// Assert
		const nameValue = await screen.getByText(comment.owner.name);
		expect(nameValue).toHaveTextContent("David Nasrulloh");
		expect(screen.getByText(comment.content)).toBeInTheDocument();
	});
});
