import "./App.css";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./routes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { asyncPreloadProcess } from "./states/isPreload/actions";
import { asyncUnsetAuthUser } from "./states/authUser/actions";
import Loading from "./components/common/loading";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import NavigationView from "./components/common/navigation";

function App() {
	const { isPreload = false, authUser } = useSelector((states) => states);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(asyncPreloadProcess());
	}, [dispatch]);

	const onSignOut = () => {
		dispatch(asyncUnsetAuthUser());
	};
	if (isPreload) {
		return null;
	}

	if (authUser === null) {
		return (
			<>
				<Loading />
				<Routes>
					<Route path="/*" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
				</Routes>
			</>
		);
	}
	return (
		<>
			<Loading />
			<NavigationView authUser={authUser} signOut={onSignOut} />
			<AppRoutes />
		</>
	);
}

export default App;
