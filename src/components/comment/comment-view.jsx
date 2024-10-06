import PropTypes from "prop-types";
import {
	Box,
	Text,
	FormControl,
	Textarea,
	Button,
	useColorModeValue,
} from "@chakra-ui/react";
import useInput from "../../hooks/use-input";

export default function CommentView({ addComment }) {
	const [comment, onCommentChange, setComment] = useInput("");
	const onCommentSubmit = () => {
		addComment(comment);
		setComment("");
	};

	// Warna yang akan menyesuaikan dengan light/dark mode
	const bgColor = useColorModeValue("gray.50", "gray.700");
	const buttonBg = useColorModeValue("blue.500", "blue.400");
	const buttonHoverBg = useColorModeValue("blue.600", "blue.500");

	return (
		<Box
			bg={bgColor}
			p="6"
			rounded="md"
			shadow="md"
			maxW="full"
			margin="auto"
			mt="8"
		>
			<Text
				fontWeight="bold"
				fontSize="16px"
				mb="4"
				color={useColorModeValue("gray.700", "gray.300")}
			>
				Leave a Comment
			</Text>
			<FormControl>
				<Textarea
					placeholder="Type your comment here..."
					resize="vertical"
					rows={4}
					value={comment}
					onChange={onCommentChange}
					bg={useColorModeValue("white", "gray.800")}
					borderColor={useColorModeValue("gray.300", "gray.600")}
					_focus={{
						borderColor: useColorModeValue("blue.400", "blue.300"),
						boxShadow: "outline",
					}}
				/>
				<Button
					variant="solid"
					bg={buttonBg}
					color="white"
					mt="4"
					onClick={onCommentSubmit}
					_hover={{ bg: buttonHoverBg }}
					_active={{ bg: buttonHoverBg }}
					rounded="md"
					transition="background-color 0.3s ease"
					width="full"
				>
					Send
				</Button>
			</FormControl>
		</Box>
	);
}

CommentView.propTypes = {
	addComment: PropTypes.func.isRequired,
};
