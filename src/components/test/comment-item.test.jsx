/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";
import CommentItem from "../comment/comment-item";

expect.extend(matchers);

// Test scenario: CommentItem Component Testing
describe("CommentItem component", () => {
	afterEach(() => {
		cleanup();
	});

	// Test scenario: Render comment item correctly
	it("should render the comment item correctly", async () => {
		// Arrange: Prepare comment data with necessary properties
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
			neutralizeVote: vi.fn(),
			authUser: "auth-user",
		};

		// Act: Render the CommentItem component with the provided comment data
		render(<CommentItem {...comment} />);

		// Assert: Ensure the comment details (owner name and content) are rendered correctly
		const nameValue = await screen.getByText(comment.owner.name);
		expect(nameValue).toHaveTextContent("David Nasrulloh");
		expect(screen.getByText(comment.content)).toBeInTheDocument();
	});
});
