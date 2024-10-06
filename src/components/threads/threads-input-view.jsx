import PropTypes from "prop-types";
import { FormControl, Input, Textarea, Button, VStack } from "@chakra-ui/react";
import useInput from "../../hooks/use-input";

export default function ThreadInputView({ addThread }) {
	const [title, onTitleChange] = useInput("");
	const [category, onCategoryChange] = useInput("");
	const [body, onBodyChange] = useInput("");

	const handleSubmit = () => {
		if (title && body && category) {
			addThread({ title, body, category });
		}
	};

	return (
		<FormControl ml={4} mb={6} mx="auto">
			<VStack spacing={4} align="stretch">
				<Input
					placeholder="Judul"
					size="md"
					value={title}
					onChange={onTitleChange}
					focusBorderColor="teal.500"
					borderColor="gray.300"
				/>
				<Input
					placeholder="Kategori"
					size="md"
					value={category}
					onChange={onCategoryChange}
					focusBorderColor="teal.500"
					borderColor="gray.300"
				/>
				<Textarea
					placeholder="Masukkan ide kamu"
					value={body}
					onChange={onBodyChange}
					size="md"
					resize="vertical"
					focusBorderColor="teal.500"
					borderColor="gray.300"
					h="150px"
				/>
				<Button
					colorScheme="teal"
					onClick={handleSubmit}
					isDisabled={!title || !category || !body}
				>
					Kirim
				</Button>
			</VStack>
		</FormControl>
	);
}

ThreadInputView.propTypes = {
	addThread: PropTypes.func.isRequired,
};
