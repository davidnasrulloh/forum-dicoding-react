import {
	Box,
	Center,
	Flex,
	Heading,
	Stack,
	VStack,
	Text,
	Link,
} from "@chakra-ui/react";
import LoginInputView from "../../components/login/login-view";

export default function LoginPage() {
	return (
		<Box width="100vw" minHeight="100vh" mx="auto" py={4}>
			<Flex justify="center" align="center" height="80vh">
				<Center>
					<Stack spacing="4">
						<VStack spacing="6">
							<Heading
								fontWeight="500"
								fontSize="30px"
								letterSpacing="-0.5px"
							>
								Login
							</Heading>
						</VStack>
						<LoginInputView />
						<Text fontSize="sm" mt="4" textAlign="center">
							Don&apos;t have an account?{" "}
							<Link
								as="a"
								href="/register"
								color="#0969da"
								fontWeight="500"
							>
								Register
							</Link>
						</Text>
					</Stack>
				</Center>
			</Flex>
		</Box>
	);
}
