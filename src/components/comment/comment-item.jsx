import parse from "html-react-parser";
import { Box, Avatar, Text, HStack, useColorModeValue } from "@chakra-ui/react";
import PropTypes from "prop-types";
import VoteButton from "../common/vote-button";
import timeSince from "../../utils";
import { commentTypes } from "../../types/comments";

export default function CommentItem({
	id,
	content,
	createdAt,
	owner,
	upVotesBy,
	downVotesBy,
	upVote,
	downVote,
	neturalizeVote,
	authUser,
}) {
	const timeColor = useColorModeValue("gray.500", "gray.400");
	const contentColor = useColorModeValue("gray.700", "gray.200");
	const borderColor = useColorModeValue("gray.200", "gray.600");

	return (
		<>
			<Box p={4} borderBottom="1px solid" borderColor={borderColor}>
				<HStack justify="space-between" mb={3}>
					<HStack spacing={4} align="center">
						<Avatar
							alt="Avatar Icon"
							src={owner.avatar}
							size="sm"
						/>
						<Text
							fontSize="sm"
							fontWeight="bold"
							color={useColorModeValue("gray.800", "white")}
						>
							{owner.name}
						</Text>
					</HStack>
					<Text fontSize="xs" color={timeColor}>
						{timeSince(new Date(createdAt))}
					</Text>
				</HStack>

				<Text
					fontSize="sm"
					color={contentColor}
					mt={2}
					lineHeight="1.5"
				>
					{parse(content)}
				</Text>

				<Box mt={4}>
					<VoteButton
						id={id}
						authUser={authUser}
						upVote={upVote}
						downVote={downVote}
						neturalizeVote={neturalizeVote}
						upVotesBy={upVotesBy}
						downVotesBy={downVotesBy}
					/>
				</Box>
			</Box>
		</>
	);
}

CommentItem.propTypes = {
	...commentTypes,
	upVote: PropTypes.func.isRequired,
	downVote: PropTypes.func.isRequired,
	neturalizeVote: PropTypes.func.isRequired,
	authUser: PropTypes.string.isRequired,
};
