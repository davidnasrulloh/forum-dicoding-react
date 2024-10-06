import { Container, Heading } from "@chakra-ui/react";

export default function NotFoundPage() {
	return (
		<Container pb={2}>
			<Heading mb={2} size="md" fontWeight="bold" textAlign="center">
				404 Not Found
			</Heading>
		</Container>
	);
}
