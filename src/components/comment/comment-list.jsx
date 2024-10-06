import PropTypes from "prop-types";
import CommentItem from "./comment-item";
import { commentTypes } from "../../types/comments";

export default function CommentsList({
	comments,
	authUser,
	upVoteComment,
	downVoteComment,
	neturalizeVoteComment,
}) {
	return (
		<>
			{comments.map((comment) => (
				<CommentItem
					key={comment.id}
					id={comment.id}
					content={comment.content}
					author={comment.author}
					createdAt={comment.createdAt}
					upVotesBy={comment.upVotesBy}
					downVotesBy={comment.downVotesBy}
					owner={comment.owner}
					authUser={authUser}
					upVote={upVoteComment}
					downVote={downVoteComment}
					neturalizeVote={neturalizeVoteComment}
				/>
			))}
		</>
	);
}

CommentsList.propTypes = {
	comments: PropTypes.arrayOf(PropTypes.shape(commentTypes)).isRequired,
	authUser: PropTypes.string.isRequired,
	upVoteComment: PropTypes.func.isRequired,
	downVoteComment: PropTypes.func.isRequired,
	neturalizeVoteComment: PropTypes.func.isRequired,
};
