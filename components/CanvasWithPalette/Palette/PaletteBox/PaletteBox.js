import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

export const PaletteBox = ({ color }) => {
  const [showCopied, setShowCopied] = useState(false);

  const copiedHandler = () => {
    navigator.clipboard.writeText(color);
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };

  return (
    <Flex flexDirection="column" position="relative">
      {showCopied && (
        <Text
          color={"black"}
          fontWeight="bold"
          backgroundColor="white"
          position="absolute"
          borderRadius={10}
          top={-6}
          left={-2}
          w={28}
          p={1}
        >
          Color Copied
        </Text>
      )}
      <Box
        w="24"
        h="28"
        bgColor={color}
        borderBottomLeftRadius={15}
        onClick={copiedHandler}
        cursor="pointer"
      ></Box>
      <Text color="black" fontWeight="bold" fontSize={18} marginTop={2}>
        {color}
      </Text>
    </Flex>
  );
};
