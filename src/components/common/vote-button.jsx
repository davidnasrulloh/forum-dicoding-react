import PropTypes from "prop-types";
import {
	Box,
	IconButton,
	Icon,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import {
	MdThumbUp,
	MdOutlineThumbUpOffAlt,
	MdThumbDown,
	MdOutlineThumbDownOffAlt,
} from "react-icons/md";

export default function VoteButton({
	id,
	upVote,
	downVote,
	neturalizeVote,
	upVotesBy,
	downVotesBy,
	authUser,
}) {
	const isUpVoted = upVotesBy.includes(authUser);
	const isDownVoted = downVotesBy.includes(authUser);
	const iconUpColor = useColorModeValue("green.500", "green.400");
	const iconDownColor = useColorModeValue("red.500", "red.400");
	const countColor = useColorModeValue("gray.600", "gray.300");

	const onUpVoteClick = () => {
		upVote(id);
	};

	const onDownVoteClick = () => {
		downVote(id);
	};

	const onNeutralizeVoteClick = () => {
		neturalizeVote(id);
	};

	return (
		<Box display="flex" alignItems="center">
			{/* Upvote Button */}
			<IconButton
				icon={
					isUpVoted ? (
						<Icon as={MdThumbUp} />
					) : (
						<Icon as={MdOutlineThumbUpOffAlt} />
					)
				}
				onClick={isUpVoted ? onNeutralizeVoteClick : onUpVoteClick}
				_hover={{ bg: "green.100" }}
				_active={{ bg: "green.200" }}
				aria-label="Upvote"
				color={isUpVoted ? iconUpColor : "gray.500"}
				variant="ghost"
				size="sm"
			/>
			{/* Upvote Count */}
			<Text fontSize="sm" fontWeight="medium" color={countColor} mx={2}>
				{upVotesBy.length}
			</Text>

			{/* Downvote Button */}
			<IconButton
				icon={
					isDownVoted ? (
						<Icon as={MdThumbDown} />
					) : (
						<Icon as={MdOutlineThumbDownOffAlt} />
					)
				}
				onClick={isDownVoted ? onNeutralizeVoteClick : onDownVoteClick}
				_hover={{ bg: "red.100" }}
				_active={{ bg: "red.200" }}
				aria-label="Downvote"
				color={isDownVoted ? iconDownColor : "gray.500"}
				variant="ghost"
				size="sm"
			/>
			{/* Downvote Count */}
			<Text fontSize="sm" fontWeight="medium" color={countColor} mx={2}>
				{downVotesBy.length}
			</Text>
		</Box>
	);
}

VoteButton.propTypes = {
	id: PropTypes.string.isRequired,
	upVote: PropTypes.func.isRequired,
	downVote: PropTypes.func.isRequired,
	neturalizeVote: PropTypes.func.isRequired,
	upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
	downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
	authUser: PropTypes.string.isRequired,
};
