import React, { useState } from "react";
import {
	Button,
	FormControl,
	FormLabel,
	HStack,
	Input,
	Alert,
	AlertIcon,
	AlertTitle,
	Stack,
	Card,
	CardBody,
} from "@chakra-ui/react";
import useLogin from "../../hooks/use-login";
import useInput from "../../hooks/use-input";

export default function LoginInputView() {
	const { login } = useLogin();
	const [email, setEmail] = useInput("");
	const [password, setPassword] = useInput("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await login({ email, password });
			setSuccess("Logged in successfully!");
			setIsLoggedIn(true);
		} catch (err) {
			console.log(err);
			setError("Invalid username or password!");
			setEmail("");
			setPassword("");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card
			bg="gray.50"
			variant="outline"
			borderColor="gray.200"
			w="350px"
			size="lg"
			borderRadius="lg"
			boxShadow="md"
			p={6}
		>
			<CardBody>
				<form onSubmit={handleSubmit}>
					{error && !isLoggedIn && (
						<Alert
							status="error"
							variant="solid"
							borderRadius="md"
							mb={4}
						>
							<AlertIcon />
							<AlertTitle fontSize="sm">{error}</AlertTitle>
						</Alert>
					)}
					{isLoggedIn && (
						<Alert
							status="success"
							variant="solid"
							borderRadius="md"
							mb={4}
						>
							<AlertIcon />
							<AlertTitle fontSize="sm">{success}</AlertTitle>
						</Alert>
					)}
					<Stack spacing={6}>
						<FormControl isRequired>
							<FormLabel size="sm" color="gray.700">
								Email Address
							</FormLabel>
							<Input
								type="email"
								bg="white"
								placeholder="Email"
								borderColor="gray.300"
								size="md"
								borderRadius="md"
								_placeholder={{ color: "gray.400" }}
								value={email}
								onChange={setEmail}
								_focus={{
									boxShadow: "0 0 0 1px #3182ce",
									borderColor: "#3182ce",
								}}
							/>
						</FormControl>
						<FormControl isRequired>
							<HStack justify="space-between">
								<FormLabel size="sm" color="gray.700">
									Password
								</FormLabel>
								<Button
									as="a"
									href="#"
									variant="link"
									size="xs"
									color="blue.500"
									fontWeight="500"
								>
									Forgot password?
								</Button>
							</HStack>
							<Input
								type="password"
								bg="white"
								placeholder="Password"
								borderColor="gray.300"
								size="md"
								borderRadius="md"
								_placeholder={{ color: "gray.400" }}
								value={password}
								onChange={setPassword}
								_focus={{
									boxShadow: "0 0 0 1px #3182ce",
									borderColor: "#3182ce",
								}}
							/>
						</FormControl>

						<Button
							type="submit"
							bg="green.400"
							color="white"
							size="md"
							fontWeight="600"
							_hover={{ bg: "green.500" }}
							_active={{ bg: "green.600" }}
							isLoading={isLoading}
							borderRadius="md"
							py={2}
						>
							Sign In
						</Button>
					</Stack>
				</form>
			</CardBody>
		</Card>
	);
}
