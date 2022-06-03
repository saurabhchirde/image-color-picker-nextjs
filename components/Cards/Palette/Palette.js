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
      <Box w="24" h="28" bgColor={color.palette1}>
        <Flex
          flexDirection="column"
          justifyContent="flex-end"
          h="full"
          py={1.5}
          fontSize={19}
        >
          <Text>{color.palette1}</Text>
        </Flex>
      </Box>
      <Box w="24" h="28" bgColor={color.palette2}>
        <Flex
          flexDirection="column"
          justifyContent="flex-end"
          h="full"
          py={1.5}
          fontSize={19}
        >
          <Text>{color.palette2}</Text>
        </Flex>
      </Box>
      <Box w="24" h="28" bgColor={color.palette3}>
        <Flex
          flexDirection="column"
          justifyContent="flex-end"
          h="full"
          py={1.5}
          fontSize={19}
        >
          <Text>{color.palette3}</Text>
        </Flex>
      </Box>
      <Box w="24" h="28" bgColor={color.palette4}>
        <Flex
          flexDirection="column"
          justifyContent="flex-end"
          h="full"
          py={1.5}
          fontSize={19}
        >
          <Text>{color.palette4}</Text>
        </Flex>
      </Box>
      <Box w="24" h="28" bgColor={color.palette5}>
        <Flex
          flexDirection="column"
          justifyContent="flex-end"
          h="full"
          py={1.5}
          fontSize={19}
        >
          <Text>{color.palette5}</Text>
        </Flex>
      </Box>
    </Flex>
  );
};
