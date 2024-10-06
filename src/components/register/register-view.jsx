import { useState } from "react";
import {
	Button,
	FormControl,
	FormLabel,
	HStack,
	Input,
	useColorMode,
	Alert,
	AlertIcon,
	AlertTitle,
	Stack,
	Card,
	CardBody,
} from "@chakra-ui/react";
import useRegister from "../../hooks/use-register";
import useInput from "../../hooks/use-input";

export default function RegisterView() {
	const { colorMode } = useColorMode();
	const { register, isLoggedIn } = useRegister();
	const [email, setEmail] = useInput("");
	const [password, setPassword] = useInput("");
	const [name, setName] = useInput("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await register({ name, email, password });
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
			bg={colorMode === "dark" ? "gray.700" : "white"}
			variant="outline"
			borderColor={colorMode === "dark" ? "gray.600" : "gray.200"}
			borderRadius="12px"
			boxShadow="md"
			w="350px"
			p={6}
			mx="auto"
			my={8}
		>
			<CardBody>
				<form onSubmit={handleSubmit}>
					{error && !isLoggedIn && (
						<Alert status="error" mb={4} borderRadius="md">
							<AlertIcon />
							<AlertTitle>{error}</AlertTitle>
						</Alert>
					)}
					<Stack spacing={4}>
						<FormControl isRequired>
							<FormLabel
								color={
									colorMode === "dark"
										? "gray.300"
										: "gray.700"
								}
							>
								Name
							</FormLabel>
							<Input
								type="text"
								bg={
									colorMode === "dark"
										? "gray.600"
										: "gray.100"
								}
								borderColor={
									colorMode === "dark"
										? "gray.500"
										: "gray.300"
								}
								_hover={{
									borderColor:
										colorMode === "dark"
											? "gray.400"
											: "gray.400",
								}}
								size="md"
								borderRadius="8px"
								value={name}
								onChange={setName}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel
								color={
									colorMode === "dark"
										? "gray.300"
										: "gray.700"
								}
							>
								Email Address
							</FormLabel>
							<Input
								type="email"
								bg={
									colorMode === "dark"
										? "gray.600"
										: "gray.100"
								}
								borderColor={
									colorMode === "dark"
										? "gray.500"
										: "gray.300"
								}
								_hover={{
									borderColor:
										colorMode === "dark"
											? "gray.400"
											: "gray.400",
								}}
								size="md"
								borderRadius="8px"
								value={email}
								onChange={setEmail}
							/>
						</FormControl>
						<FormControl isRequired>
							<HStack justify="space-between">
								<FormLabel
									color={
										colorMode === "dark"
											? "gray.300"
											: "gray.700"
									}
								>
									Password
								</FormLabel>
								<Button
									as="a"
									href="#"
									variant="link"
									size="sm"
									color="blue.400"
									fontWeight="500"
								>
									Forgot password?
								</Button>
							</HStack>
							<Input
								type="password"
								bg={
									colorMode === "dark"
										? "gray.600"
										: "gray.100"
								}
								borderColor={
									colorMode === "dark"
										? "gray.500"
										: "gray.300"
								}
								_hover={{
									borderColor:
										colorMode === "dark"
											? "gray.400"
											: "gray.400",
								}}
								size="md"
								borderRadius="8px"
								value={password}
								onChange={setPassword}
							/>
						</FormControl>

						<Button
							type="submit"
							bg="blue.500"
							color="white"
							size="md"
							borderRadius="8px"
							_hover={{ bg: "blue.600" }}
							_active={{ bg: "blue.700" }}
							isLoading={isLoading}
							loadingText="Registering"
						>
							Register
						</Button>
					</Stack>
				</form>
			</CardBody>
		</Card>
	);
}
