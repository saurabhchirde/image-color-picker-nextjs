import { Box, Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { Canvas } from "./Canvas/Canvas";
import { Palette } from "./Palette/Palette";
import React, { useRef, useState } from "react";
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
  const [name, setName] = useState("");

  return (
    <Flex
      width={["100%", "100%", "100%", "50%"]}
      height={{
        base: "100%",
        md: "container",
        xl: "container.md",
      }}
      justifyContent="center"
    >
      <Flex
        flexDirection="column"
        ref={componentRef}
        p={6}
        justifyContent="space-between"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
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
        <Text
          position="relative"
          marginTop={8}
          visibility={name ? "visible" : "hidden"}
          textAlign="center"
          fontSize={18}
          fontWeight="500"
          color="blackAlpha.700"
        >
          {name}
        </Text>
      </Flex>
      <Flex flexDirection="column" paddingTop={6} px={2}>
        <Tooltip label="Random Image" placement="top" p={2}>
          <IconButton
            aria-label="Call Segun"
            color="blue.400"
            fontSize="3xl"
            bg="transparent"
            p={5}
            py={6}
            marginBottom={5}
            borderRadius="xl"
            icon={<BsShuffle />}
            onClick={randomImageHandler}
          />
        </Tooltip>
        <Tooltip label="Download Image" placement="top" p={2}>
          <IconButton
            aria-label="Call Segun"
            color="blue.400"
            fontSize="3xl"
            bg="transparent"
            p={5}
            py={6}
            marginBottom={5}
            borderRadius="xl"
            icon={<FiDownload />}
            onClick={async () => {
              setName("made with ❤️ by Pebble Colors");
              const { exportComponentAsPNG } = await import(
                "react-component-export-image"
              );
              setName("");
              exportComponentAsPNG(componentRef);
            }}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};
