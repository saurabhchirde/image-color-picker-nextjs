import { Box, Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { Canvas } from "./Canvas/Canvas";
import { Palette } from "./Palette/Palette";
import React, { useRef } from "react";
import { FiDownload } from "react-icons/fi";
import { BsShuffle } from "react-icons/bs";

export const CanvasWithPalette = (props) => {
  const {
    color,
    setColor,
    imageData,
    imageUrl,
    flag,
    pickerPos,
    setPickerPosition,
    showRandomImage,
    randomImageHandler,
  } = props;

  const componentRef = useRef();

  return (
    <Flex>
      <Flex flexDirection="column" gap={2} ref={componentRef} px={10} py={6}>
        <Box
          h="full"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Canvas
            color={color}
            setColor={setColor}
            imageData={imageData}
            imageUrl={imageUrl}
            flag={flag}
            pickerPos={pickerPos}
            setPickerPosition={setPickerPosition}
            showRandomImage={showRandomImage}
          />
        </Box>
        <Palette color={color} />
      </Flex>
      <Flex flexDirection="column" paddingLeft="-1" paddingTop={4}>
        <Tooltip label="Random Image" placement="top" p={2}>
          <IconButton
            aria-label="Call Segun"
            color="blue.400"
            fontSize="4xl"
            bg="transparent"
            p={7}
            marginBottom={5}
            borderRadius="full"
            icon={<BsShuffle />}
            onClick={randomImageHandler}
          />
        </Tooltip>
        <Tooltip label="Download Image" placement="top" p={2}>
          <IconButton
            aria-label="Call Segun"
            color="blue.400"
            fontSize="4xl"
            bg="transparent"
            p={7}
            marginBottom={5}
            borderRadius="full"
            icon={<FiDownload />}
            onClick={async () => {
              const { exportComponentAsPNG } = await import(
                "react-component-export-image"
              );
              exportComponentAsPNG(componentRef);
            }}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};
