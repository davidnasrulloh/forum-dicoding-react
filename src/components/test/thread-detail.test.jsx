/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ThreadDetailView from "../threads/threads-details";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

describe("ThreadDetail component", () => {
	afterEach(() => {
		cleanup();
	});

	it("should render the thread details correctly", async () => {
		// Arrange
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
			neturalizeVoteThreadDetail: vi.fn(),
			authUser: "auth-user",
		};

		// Act
		render(<ThreadDetailView {...thread} />);
		const categoryValue = await screen.getByText(thread.category);

		// Assert
		expect(categoryValue).toHaveTextContent("Sample Category");
		expect(screen.getByText(thread.category)).toBeInTheDocument();
		expect(screen.getByText(thread.title)).toBeInTheDocument();
		expect(screen.getByText(thread.body)).toBeInTheDocument();
	});
});
