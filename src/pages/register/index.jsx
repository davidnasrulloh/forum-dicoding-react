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
import RegisterView from "../../components/register/register-view";

export default function RegisterPage() {
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
								Register
							</Heading>
						</VStack>
						<RegisterView />
						<Text fontSize="sm" mt="4" textAlign="center">
							Already have an account?{" "}
							<Link
								as="a"
								href="/login"
								color="#0969da"
								fontWeight="500"
							>
								Login
							</Link>
						</Text>
					</Stack>
				</Center>
			</Flex>
		</Box>
	);
}
