/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Box,
	Button,
	Flex,
	IconButton,
	useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import ThreadsList from "../../components/threads/threads-list";
import asyncPopulateUsersAndThreads from "../../states/shared/actions";
import {
	asyncUpVoteThread,
	asyncDownVoteThread,
	asyncNeturalizeVoteThread,
} from "../../states/threads/actions";

export default function HomePage() {
	const [filter, setFilter] = useState("");
	const dispatch = useDispatch();
	const {
		threads = [],
		users = [],
		authUser,
	} = useSelector((states) => states);
	const categories = new Set(threads.map((thread) => thread.category));

	useEffect(() => {
		dispatch(asyncPopulateUsersAndThreads());
	}, [dispatch]);

	const onUpVoteThread = (id) => {
		dispatch(asyncUpVoteThread(id));
	};

	const onDownVoteThread = (id) => {
		dispatch(asyncDownVoteThread(id));
	};

	const onNeturalizeVoteThread = (id) => {
		dispatch(asyncNeturalizeVoteThread(id));
	};

	const threadList = threads.map((thread) => ({
		...thread,
		threadOwner: users.find((user) => user.id === thread.ownerId),
		authUser: authUser.id,
	}));

	const primaryColor = useColorModeValue("blue.500", "gray.200");

	const handleFilterClick = (category) => {
		setFilter(filter === category ? "" : category);
	};

	return (
		<Box width="100vw" minHeight="100vh" mx="auto" py={4}>
			<Flex justify="center" mb={5}>
				{Array.from(categories).map((category) => (
					<Button
						key={category}
						variant={filter === category ? "solid" : "ghost"}
						onClick={() => handleFilterClick(category)}
						mr={2}
						mb={2}
						color={
							filter === category
								? "white"
								: useColorModeValue("gray.700", "gray.400")
						}
						bg={filter === category ? primaryColor : "transparent"}
						_hover={{
							bg: filter === category ? primaryColor : "gray.100",
						}}
					>
						{`#${category}`}
					</Button>
				))}
			</Flex>

			<ThreadsList
				threads={
					filter
						? threadList.filter(
								(thread) => thread.category === filter
						  )
						: threadList
				}
				upVote={onUpVoteThread}
				downVote={onDownVoteThread}
				neturalizeVote={onNeturalizeVoteThread}
			/>

			<IconButton
				as={Link}
				to="/add"
				position="fixed"
				bottom="40px"
				right="40px"
				variant="ghost"
				icon={<AddIcon />}
				color={primaryColor}
				_hover={{ bg: "gray.100" }}
			/>
		</Box>
	);
}
