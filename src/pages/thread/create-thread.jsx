import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Heading } from "@chakra-ui/react";

import { asyncCreateThread } from "../../states/threads/actions";
import ThreadInputView from "../../components/threads/threads-input-view";

export default function CreateThread() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onAddThread = ({ title, body, category }) => {
		dispatch(asyncCreateThread({ title, body, category }));
		navigate("/");
	};
	return (
		<Box width="100vw" minHeight="85vh" mx="auto" p={12}>
			<Heading as="h1" size="lg" fontWeight="bold" mb={5}>
				Create New Thread
			</Heading>
			<ThreadInputView addThread={onAddThread} />
		</Box>
	);
}
