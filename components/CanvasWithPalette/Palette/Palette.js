import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { usePebble } from "../../../context/PebbleContext";
import { PaletteBox } from "./PaletteBox/PaletteBox";
export const Palette = () => {
  const { color } = usePebble();
  const isMobileView = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      w="full"
      gap={1.5}
      textAlign="center"
      color="white"
      justifyContent="center"
      marginTop={2}
      wrap="wrap"
    >
      <PaletteBox
        color={color?.picker1}
        topLeft={0}
        topRight={0}
        botLeft={isMobileView ? 0 : 15}
        botRight={0}
      />
      <PaletteBox
        color={color?.picker2}
        topLeft={0}
        topRight={0}
        botLeft={0}
        botRight={0}
      />
      <PaletteBox
        color={color?.picker3}
        topLeft={0}
        topRight={0}
        botLeft={0}
        botRight={0}
      />
      <PaletteBox
        color={color?.picker4}
        topLeft={0}
        topRight={0}
        botLeft={0}
        botRight={0}
      />
      <PaletteBox
        color={color?.picker5}
        topLeft={0}
        topRight={0}
        botLeft={0}
        botRight={isMobileView ? 0 : 15}
      />
    </Flex>
  );
};
