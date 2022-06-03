import { Flex, Box, Text } from "@chakra-ui/react";
export const Palette = ({ color }) => {
  return (
    <Flex
      w="full"
      gap={1.5}
      textAlign="center"
      color="white"
      justifyContent="center"
    >
      <Flex flexDirection="column">
        <Box
          w="24"
          h="28"
          bgColor={color?.picker1}
          borderBottomLeftRadius={15}
        ></Box>
        <Text color="black" fontWeight="bold" fontSize={18} marginTop={2}>
          {color?.picker1}
        </Text>
      </Flex>
      <Flex flexDirection="column">
        <Box w="24" h="28" bgColor={color?.picker2}></Box>
        <Text color="black" fontWeight="bold" fontSize={18} marginTop={2}>
          {color?.picker2}
        </Text>
      </Flex>
      <Flex flexDirection="column">
        <Box w="24" h="28" bgColor={color?.picker3}></Box>
        <Text color="black" fontWeight="bold" fontSize={18} marginTop={2}>
          {color?.picker3}
        </Text>
      </Flex>
      <Flex flexDirection="column">
        <Box w="24" h="28" bgColor={color?.picker4}></Box>
        <Text color="black" fontWeight="bold" fontSize={18} marginTop={2}>
          {color?.picker4}
        </Text>
      </Flex>
      <Flex flexDirection="column">
        <Box
          w="24"
          h="28"
          bgColor={color?.picker5}
          borderBottomRightRadius={15}
        ></Box>
        <Text color="black" fontWeight="bold" fontSize={18} marginTop={2}>
          {color?.picker5}
        </Text>
      </Flex>
    </Flex>
  );
};
