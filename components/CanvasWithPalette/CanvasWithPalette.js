import { Box, Flex, IconButton, Text, Tooltip, VStack } from "@chakra-ui/react";
import { Canvas } from "./Canvas/Canvas";
import { Palette } from "./Palette/Palette";
import React, { useEffect, useRef, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { BsShuffle } from "react-icons/bs";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { TbColorPicker } from "react-icons/tb";
import { usePebble } from "../../context/PebbleContext";

export const CanvasWithPalette = ({ randomImageHandler }) => {
  const componentRef = useRef();
  const { color, setColor, extractedColors, showPicker, setShowPicker } =
    usePebble();

  const [waterMark, setWaterMark] = useState("");

  const getVibrantColorHandler = () => {
    setShowPicker(false);
    setColor({
      picker1: extractedColors.color1,
      picker2: extractedColors.color2,
      picker3: extractedColors.color3,
      picker4: extractedColors.color4,
      picker5: extractedColors.color5,
    });
  };

  const pickColorHandler = () => {
    setShowPicker(true);
  };

  useEffect(() => {
    if (!showPicker) {
      getVibrantColorHandler();
    }
  }, [showPicker, color.picker1]);

  return (
    <Flex
      width={["100%", "100%", "100%", "60%"]}
      maxWidth={650}
      height={{
        base: "100%",
        md: "container",
      }}
      justifyContent="space-between"
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
          style={{ borderRadius: "15px 15px 0 0" }}
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
        paddingBottom={20}
        justifyContent="space-between"
      >
        <VStack>
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
          {showPicker && (
            <Tooltip label="Vibrant Colors" placement="top" p={2}>
              <IconButton
                aria-label="Call Segun"
                color="blue.400"
                fontSize="4xl"
                bg="transparent"
                p={5}
                py={6}
                marginBottom={5}
                borderRadius="xl"
                icon={<HiOutlineColorSwatch />}
                onClick={getVibrantColorHandler}
              />
            </Tooltip>
          )}
          {!showPicker && (
            <Tooltip label="Pick Colors" placement="top" p={2}>
              <IconButton
                aria-label="Call Segun"
                color="blue.400"
                fontSize="4xl"
                bg="transparent"
                p={5}
                py={6}
                marginBottom={5}
                borderRadius="xl"
                icon={<TbColorPicker />}
                onClick={pickColorHandler}
              />
            </Tooltip>
          )}
        </VStack>
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
