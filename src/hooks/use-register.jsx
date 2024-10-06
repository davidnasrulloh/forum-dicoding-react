import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncRegisterUser } from "../states/user/actions";

export default function useRegister() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	async function register({ name, email, password }) {
		try {
			await dispatch(asyncRegisterUser({ name, email, password })).then(
				() => {
					setIsLoggedIn(true);
					navigate("/login");
				}
			);
		} catch (error) {
			console.log(error);
		}
	}

	return { register, isLoggedIn };
}
