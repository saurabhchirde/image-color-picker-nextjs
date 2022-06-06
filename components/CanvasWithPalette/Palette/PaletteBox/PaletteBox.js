import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { GetColorName } from "hex-color-to-color-name";

export const PaletteBox = ({ color, topLeft, topRight, botLeft, botRight }) => {
  const [showCopied, setShowCopied] = useState(false);

  const copiedHandler = () => {
    navigator.clipboard.writeText(color);
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 1000);
  };

  return (
    // Single color palette
    <Flex flexDirection="column" position="relative">
      {showCopied && (
        <Text
          color="black"
          fontWeight="bold"
          backgroundColor="white"
          position="absolute"
          borderRadius={10}
          top={-6}
          left={-2}
          w={28}
          p={1}
          transition="400ms ease-in"
        >
          Color Copied
        </Text>
      )}
      {color && (
        <Text
          color="blackAlpha.800"
          fontWeight="500"
          fontSize={15}
          maxW={24}
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          marginTop={2}
          marginBottom={2}
          onClick={copiedHandler}
          cursor="pointer"
        >
          {GetColorName(color)}
        </Text>
      )}
      <Box
        w="24"
        h="24"
        bgColor={color}
        borderTopLeftRadius={topLeft}
        borderTopRightRadius={topRight}
        borderBottomLeftRadius={botLeft}
        borderBottomRightRadius={botRight}
        onClick={copiedHandler}
        cursor="pointer"
      ></Box>
      <Text
        color="blackAlpha.800"
        fontWeight="500"
        fontSize={18}
        marginTop={2}
        onClick={copiedHandler}
        cursor="pointer"
      >
        {color}
      </Text>
    </Flex>
  );
};
