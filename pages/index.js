import {
  Container,
  VStack,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { FiDownload, FiCodesandbox } from "react-icons/fi";
import { Palette } from "../components/Cards/Palette/Palette";

const HomePage = () => {
  return (
    <Container h="100vh" maxW="container" p={0}>
      <Flex h="90vh" py={10} justifyContent="center">
        <VStack
          w="md"
          h="full"
          p={10}
          spacing={10}
          alignItems="flex-start"
          justifyContent="center"
        >
          <Heading size="3xl">Get Colors from your Photos</Heading>
          <Text>
            Need a color palette that perfectly matches your favorite images?
            With Dopely image color palette generator, you can create color
            schemes in seconds. Simply upload a photo, and we’ll use the hues in
            the photo to create your palette.
          </Text>
          <Button colorScheme="blue" borderRadius="full" size="lg" p={7}>
            Upload Image
          </Button>
        </VStack>
        <VStack
          w="container.md"
          h="full"
          display="flex"
          flexDirection="row"
          alignItems="flex-end"
          bg="gray.50"
        >
          <VStack w="full" h="full" p={5} alignItems="flex-start" bg="gray.50">
            <Image
              src="https://images.unsplash.com/photo-1612808375766-b63ce23ae7f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
              alt="uploaded"
              objectFit="cover"
              height="86%"
              width="full"
            />
            <Palette />
          </VStack>
          <VStack
            h="full"
            justifyContent="space-between"
            paddingRight={5}
            py={5}
          >
            <IconButton
              aria-label="Call Segun"
              size="lg"
              borderRadius="full"
              icon={<FiCodesandbox />}
            />
            <IconButton
              aria-label="Call Segun"
              size="lg"
              borderRadius="full"
              icon={<FiDownload />}
            />
          </VStack>
        </VStack>
      </Flex>
    </Container>
  );
};

export default HomePage;
