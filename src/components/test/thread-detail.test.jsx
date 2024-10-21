/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ThreadDetailView from "../threads/threads-details";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

// Test scenario: ThreadDetail Component Testing
describe("ThreadDetail component", () => {
	afterEach(() => {
		cleanup();
	});

	// Test scenario: Render thread details correctly
	it("should render the thread details correctly", async () => {
		// Arrange: Prepare thread data with necessary properties
		const thread = {
			id: "1",
			title: "Sample Thread",
			body: "This is a sample thread body.",
			owner: {
				id: "1",
				name: "David Nasrulloh",
				avatar: "avatar.jpg",
			},
			category: "Sample Category",
			createdAt: new Date().toISOString(),
			upVotesBy: [],
			downVotesBy: [],
			upVoteThreadDetail: vi.fn(),
			downVoteThreadDetail: vi.fn(),
			neutralizeVoteThreadDetail: vi.fn(),
			authUser: "auth-user",
		};

		// Act: Render the ThreadDetailView component with the provided thread data
		render(<ThreadDetailView {...thread} />);
		const categoryValue = await screen.getByText(thread.category);

		// Assert: Ensure the thread details (category, title, body) are rendered correctly
		expect(categoryValue).toHaveTextContent("Sample Category");
		expect(screen.getByText(thread.category)).toBeInTheDocument();
		expect(screen.getByText(thread.title)).toBeInTheDocument();
		expect(screen.getByText(thread.body)).toBeInTheDocument();
	});
});
