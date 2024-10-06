import PropTypes from "prop-types";
import { Avatar, Button, Text, Flex, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { userTypes } from "../../types/user";

export default function NavigationView({ authUser, signOut }) {
	return (
		<Box pb={10}>
			<Flex bg="white" p={4} boxShadow="sm" alignItems="center">
				<Box flexGrow={1}>
					<Link
						to="/"
						style={{ textDecoration: "none", color: "black" }}
					>
						<Text fontSize="xl" fontWeight="bold">
							Forum Apps
						</Text>
					</Link>
				</Box>

				<Box flexGrow={1}>
					<Link to="/" style={{ textDecoration: "none" }}>
						<Button colorScheme="blue" variant="outline" mr={2}>
							Threads
						</Button>
					</Link>
					<Link to="/leaderboards" style={{ textDecoration: "none" }}>
						<Button colorScheme="blue" variant="outline">
							Leaderboards
						</Button>
					</Link>
				</Box>

				<Avatar
					alt="Avatar Icon"
					src={authUser.avatar}
					boxSize={10}
					mr={2}
				/>
				<Button colorScheme="red" onClick={signOut}>
					Logout
				</Button>
			</Flex>
		</Box>
	);
}

NavigationView.propTypes = {
	authUser: PropTypes.shape(userTypes).isRequired,
	signOut: PropTypes.func.isRequired,
};
