import { Flex } from "@chakra-ui/react";
import { PaletteBox } from "./PaletteBox/PaletteBox";
export const Palette = ({ color }) => {
  return (
    <Flex
      w="full"
      gap={1.5}
      textAlign="center"
      color="white"
      justifyContent="center"
    >
      <PaletteBox color={color?.picker1} />
      <PaletteBox color={color?.picker2} />
      <PaletteBox color={color?.picker3} />
      <PaletteBox color={color?.picker4} />
      <PaletteBox color={color?.picker5} />
    </Flex>
  );
};
