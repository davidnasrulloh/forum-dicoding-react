import PropTypes from "prop-types";
import { Box, VStack } from "@chakra-ui/react";
import ThreadItem from "./threads-item";
import { threadItemTypes } from "../../types/threads";

export default function ThreadsList({
	threads,
	upVote,
	downVote,
	neturalizeVote,
}) {
	return (
		<Box p={4}>
			<VStack spacing={4}>
				{threads.map((thread) => (
					<ThreadItem
						key={thread.id}
						id={thread.id}
						title={thread.title}
						body={thread.body}
						category={thread.category}
						createdAt={thread.createdAt}
						upVotesBy={thread.upVotesBy}
						downVotesBy={thread.downVotesBy}
						totalComments={thread.totalComments}
						threadOwner={thread.threadOwner}
						authUser={thread.authUser}
						upVote={upVote}
						downVote={downVote}
						neturalizeVote={neturalizeVote}
					/>
				))}
			</VStack>
		</Box>
	);
}

ThreadsList.propTypes = {
	threads: PropTypes.arrayOf(PropTypes.shape(threadItemTypes)).isRequired,
	upVote: PropTypes.func.isRequired,
	downVote: PropTypes.func.isRequired,
	neturalizeVote: PropTypes.func.isRequired,
};
