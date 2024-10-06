import { Box, Avatar, Text, Flex, Grid, GridItem } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { userTypes } from "../../types/user";

export default function LeaderBoardItem({ user, score }) {
	return (
		<Grid
			templateColumns="repeat(12, 1fr)"
			gap={6}
			mb={4}
			alignItems="center"
			minH="54px"
		>
			<GridItem colSpan={10}>
				<Flex alignItems="center" gap={2}>
					<Avatar src={user.avatar} size="md" mr={4} />
					<Box>
						<Text fontSize="lg" fontWeight="bold" color="gray.800">
							{user.name}
						</Text>
					</Box>
				</Flex>
			</GridItem>
			<GridItem colSpan={2}>
				<Text
					fontSize="lg"
					fontWeight="bold"
					textAlign="right"
					color="teal.500"
				>
					{score}
				</Text>
			</GridItem>
		</Grid>
	);
}

LeaderBoardItem.propTypes = {
	user: PropTypes.shape(userTypes).isRequired,
	score: PropTypes.number.isRequired,
};
