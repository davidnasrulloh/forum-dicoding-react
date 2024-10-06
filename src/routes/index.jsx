import { Route, Routes } from "react-router-dom";

import NotFoundPage from "../pages/not-found";
import RegisterPage from "../pages/register";
import LoginPage from "../pages/login";
import CreateThread from "../pages/thread/create-thread";
import LeaderboardsPage from "../pages/leader-board";
import ThreadsDetailsPage from "../pages/thread/thread-details";
import HomePage from "../pages/home";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/thread/:threadId" element={<ThreadsDetailsPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/create" element={<CreateThread />} />
			<Route path="/leaderboards" element={<LeaderboardsPage />} />
			<Route path="/add" element={<CreateThread />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};

export default AppRoutes;
