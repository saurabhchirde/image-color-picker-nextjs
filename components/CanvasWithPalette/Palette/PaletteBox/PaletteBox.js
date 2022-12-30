import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import { GetColorName } from "hex-color-to-color-name";

export const PaletteBox = ({ color, topLeft, topRight, botLeft, botRight }) => {
  const [showCopied, setShowCopied] = useState(false);
  const isMobileView = useBreakpointValue({ base: true, md: false });

  const copiedHandler = () => {
    navigator.clipboard.writeText(color);
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 1000);
  };

  return (
    // Single color palette
    <Flex flexDirection="column" position="relative" alignItems="center">
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
          fontSize={isMobileView ? 13 : 15}
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
        w={isMobileView ? "14" : "24"}
        h={isMobileView ? "14" : "24"}
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
        fontSize={isMobileView ? 14 : 18}
        marginTop={2}
        onClick={copiedHandler}
        cursor="pointer"
      >
        {color}
      </Text>
    </Flex>
  );
};
