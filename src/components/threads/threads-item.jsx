import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
	Card,
	CardBody,
	CardFooter,
	Text,
	IconButton,
	Avatar,
	Box,
	useColorModeValue,
} from "@chakra-ui/react";
import { LiaCommentSolid } from "react-icons/lia";
import VoteButton from "../common/vote-button";
import timeSince from "../../utils";
import { threadItemTypes } from "../../types/threads";

export default function ThreadItem({
	id,
	title,
	body,
	category,
	createdAt,
	upVotesBy,
	downVotesBy,
	totalComments,
	upVote,
	downVote,
	neturalizeVote,
	threadOwner,
	authUser,
}) {
	const navigate = useNavigate();

	const onThreadClick = () => {
		navigate(`/thread/${id}`);
	};

	const textColor = useColorModeValue("gray.700", "white");
	const secondaryTextColor = useColorModeValue("gray.500", "gray.400");

	return (
		<Card mt={4} p={4} shadow="md" borderWidth="1px">
			<CardBody onClick={onThreadClick} cursor="pointer">
				{/* Kategori dan Judul */}
				<Text fontSize="md" fontWeight="bold" color={textColor}>
					#{category}
				</Text>
				<Text fontSize="2xl" fontWeight="bold" mb={2} color={textColor}>
					{title}
				</Text>
				<Text fontSize="md" color={textColor} noOfLines={3}>
					{body}
				</Text>
			</CardBody>
			<CardFooter
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				{/* Bagian Vote */}
				<Box display="flex" alignItems="center">
					<VoteButton
						id={id}
						authUser={authUser}
						upVote={upVote}
						downVote={downVote}
						neturalizeVote={neturalizeVote}
						upVotesBy={upVotesBy}
						downVotesBy={downVotesBy}
					/>
					<IconButton
						icon={<LiaCommentSolid />}
						aria-label="Comments"
						ml={2}
						variant="ghost"
					/>
					<Text fontSize="sm" color={secondaryTextColor} ml={1}>
						{totalComments} Comments
					</Text>
				</Box>

				{/* Informasi Pemilik Thread dan Waktu Pembuatan */}
				<Box display="flex" alignItems="center">
					<Text fontSize="sm" color={secondaryTextColor} ml={4}>
						{timeSince(new Date(createdAt))} • Dibuat oleh{" "}
						{threadOwner.name}
					</Text>
					<Avatar src={threadOwner.avatar} size="sm" ml={3} />
				</Box>
			</CardFooter>
		</Card>
	);
}

ThreadItem.propTypes = {
	...threadItemTypes,
	authUser: PropTypes.string.isRequired,
	upVote: PropTypes.func.isRequired,
	downVote: PropTypes.func.isRequired,
	neturalizeVote: PropTypes.func.isRequired,
};
