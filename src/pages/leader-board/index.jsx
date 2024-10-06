import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Text, Grid } from "@chakra-ui/react";
import { asyncPopulateLeaderboards } from "../../states/leaderBoards/actions";
import LeaderBoardItem from "../../components/common/leader-board-item";

export default function LeaderboardsPage() {
	const dispatch = useDispatch();
	const { leaderboards = [] } = useSelector((states) => states);

	useEffect(() => {
		dispatch(asyncPopulateLeaderboards());
	}, [dispatch]);

	return (
		<Box width="100vw" minHeight="100vh" mx="auto" px={12}>
			<Text fontSize="2xl" fontWeight="bold" mb={4}>
				Leaderboards
			</Text>
			<Grid
				templateColumns="repeat(12, 1fr)"
				gap={6}
				mb={4}
				alignItems="center"
				minH="54px"
			>
				<Box gridColumn="span 10">
					<Text fontSize="xl" fontWeight="bold">
						10 Pengguna Teratas
					</Text>
				</Box>
				<Box gridColumn="span 2" justifyContent={"end"}>
					<Text fontSize="lg" fontWeight="bold" textAlign="right">
						Skor
					</Text>
				</Box>
			</Grid>
			{leaderboards.map(({ user, score }) => (
				<LeaderBoardItem key={user.id} user={user} score={score} />
			))}
		</Box>
	);
}
