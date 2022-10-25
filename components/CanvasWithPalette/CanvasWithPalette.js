import {
  Box,
  Flex,
  IconButton,
  Text,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
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
  const isMobileView = useBreakpointValue({ base: true, md: false });

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
      maxWidth={isMobileView ? "100%" : 650}
      height={{
        base: "100%",
        md: "container",
      }}
      direction={isMobileView ? "column-reverse" : "row"}
      justifyContent="space-between"
    >
      <Flex
        flexDirection="column"
        ref={componentRef}
        p={isMobileView ? 0 : 6}
        py={isMobileView ? 2 : 6}
        justifyContent="flex-start"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          className="canvas-container"
          style={{ borderRadius: isMobileView ? 0 : "15px 15px 0 0" }}
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
        direction={isMobileView ? "row" : "column"}
        paddingTop={isMobileView ? 1 : 6}
        px={isMobileView ? 0 : 2}
        paddingBottom={isMobileView ? 0 : 20}
        justifyContent="space-between"
      >
        <Flex
          direction={isMobileView ? "row" : "column"}
          gap={isMobileView ? 4 : 0}
        >
          <Tooltip label="Random Image" placement="top" p={2}>
            <IconButton
              aria-label="Random"
              color="blue.400"
              fontSize={isMobileView ? "2xl" : "4xl"}
              bg="transparent"
              p={5}
              py={6}
              marginBottom={isMobileView ? 0 : 5}
              borderRadius="xl"
              icon={<BsShuffle />}
              onClick={randomImageHandler}
            />
          </Tooltip>
          {showPicker && (
            <Tooltip label="Vibrant Colors" placement="top" p={2}>
              <IconButton
                aria-label="Get Vibrant"
                color="blue.400"
                fontSize={isMobileView ? "2xl" : "4xl"}
                bg="transparent"
                p={5}
                py={6}
                marginBottom={isMobileView ? 0 : 5}
                borderRadius="xl"
                icon={<HiOutlineColorSwatch />}
                onClick={getVibrantColorHandler}
              />
            </Tooltip>
          )}
          {!showPicker && (
            <Tooltip label="Pick Colors" placement="top" p={2}>
              <IconButton
                aria-label="Color Picker"
                color="blue.400"
                fontSize={isMobileView ? "2xl" : "4xl"}
                bg="transparent"
                p={5}
                py={6}
                marginBottom={isMobileView ? 0 : 5}
                borderRadius="xl"
                icon={<TbColorPicker />}
                onClick={pickColorHandler}
              />
            </Tooltip>
          )}
        </Flex>
        <Tooltip label="Download Image" placement="top" p={2}>
          <IconButton
            aria-label="Download"
            color="blue.400"
            fontSize={isMobileView ? "2xl" : "4xl"}
            bg="transparent"
            p={5}
            py={6}
            marginBottom={isMobileView ? 0 : 5}
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
