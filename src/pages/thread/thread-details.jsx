import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Box, Text } from "@chakra-ui/react";
import {
	asyncReceiveThreadDetail,
	asyncUpVoteThreadDetail,
	asyncDownVoteThreadDetail,
	asyncNeutralizeVoteThreadDetail,
	asyncCreateComment,
	asyncUpVoteComment,
	asyncDownVoteComment,
	asyncNeutralizeVoteComment,
} from "../../states/threads/threadDetail/actions";

import NotFoundPage from "../not-found";
import ThreadDetailView from "../../components/threads/threads-details";
import CommentView from "../../components/comment/comment-view";
import CommentsList from "../../components/comment/comment-list";

export default function ThreadsDetailsPage() {
	const { threadId } = useParams();
	const { threadDetail = null, authUser } = useSelector((states) => states);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(asyncReceiveThreadDetail(threadId));
	}, [threadId, dispatch]);

	const onUpVoteThreadDetail = () => {
		dispatch(asyncUpVoteThreadDetail());
	};

	const onDownVoteThreadDetail = () => {
		dispatch(asyncDownVoteThreadDetail());
	};

	const onNeturalizeVoteThreadDetail = () => {
		dispatch(asyncNeutralizeVoteThreadDetail());
	};

	const onCommentSubmit = (content) => {
		dispatch(asyncCreateComment({ content }));
	};

	const onUpVoteComment = (id) => {
		dispatch(asyncUpVoteComment(id));
	};

	const onDownVoteComment = (id) => {
		dispatch(asyncDownVoteComment(id));
	};

	const onNeturalizeVoteComment = (id) => {
		dispatch(asyncNeutralizeVoteComment(id));
	};

	if (threadDetail === null) {
		return <NotFoundPage />;
	}

	return (
		<Box width="100vw" minHeight="100vh" mx="auto" py={4}>
			<Container maxWidth="container.lg">
				<ThreadDetailView
					id={threadDetail.id}
					title={threadDetail.title}
					body={threadDetail.body}
					owner={threadDetail.owner}
					category={threadDetail.category}
					createdAt={threadDetail.createdAt}
					upVotesBy={threadDetail.upVotesBy}
					downVotesBy={threadDetail.downVotesBy}
					authUser={authUser.id}
					upVoteThreadDetail={onUpVoteThreadDetail}
					downVoteThreadDetail={onDownVoteThreadDetail}
					neturalizeVoteThreadDetail={onNeturalizeVoteThreadDetail}
				/>
				<CommentView addComment={onCommentSubmit} />
				<Text fontSize={18} ml={2} fontWeight="bold" my={2}>
					Comment(
					{threadDetail.comments.length})
				</Text>
				<CommentsList
					comments={threadDetail.comments}
					authUser={authUser.id}
					upVoteComment={onUpVoteComment}
					downVoteComment={onDownVoteComment}
					neturalizeVoteComment={onNeturalizeVoteComment}
				/>
			</Container>
		</Box>
	);
}
