import { Box, Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { Canvas } from "./Canvas/Canvas";
import { Palette } from "./Palette/Palette";
import React, { useRef, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { BsShuffle } from "react-icons/bs";

export const CanvasWithPalette = ({ randomImageHandler }) => {
  const componentRef = useRef();

  const [waterMark, setWaterMark] = useState("");

  return (
    <Flex
      width={["100%", "100%", "100%", "50%"]}
      height={{
        base: "100%",
        md: "container",
      }}
      justifyContent="center"
    >
      <Flex
        flexDirection="column"
        ref={componentRef}
        p={6}
        justifyContent="flex-start"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          className="canvas-container"
        >
          <Canvas />
        </Box>
        <Palette />
        <Text
          position="relative"
          marginTop={8}
          visibility={waterMark ? "visible" : "hidden"}
          textAlign="center"
          fontSize={18}
          fontWeight="500"
          color="blackAlpha.700"
        >
          {waterMark}
        </Text>
      </Flex>
      <Flex
        flexDirection="column"
        paddingTop={6}
        px={2}
        py={20}
        justifyContent="space-between"
      >
        <Tooltip label="Random Image" placement="top" p={2}>
          <IconButton
            aria-label="Call Segun"
            color="blue.400"
            fontSize="4xl"
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
            fontSize="4xl"
            bg="transparent"
            p={5}
            py={6}
            marginBottom={5}
            borderRadius="xl"
            icon={<FiDownload />}
            onClick={async () => {
              setWaterMark("made with Pebble Colors");
              const { exportComponentAsPNG } = await import(
                "react-component-export-image"
              );
              setWaterMark("");
              exportComponentAsPNG(componentRef, { fileName: "Palette" });
            }}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};
