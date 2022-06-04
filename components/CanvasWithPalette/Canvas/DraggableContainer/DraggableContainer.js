import { Box } from "@chakra-ui/react";
import { DraggableItem } from "../DraggableItems/DraggableItems";

export const DraggableContainer = ({ mouseMoveHandler, color }) => {
  return (
    <Box position="absolute" w="500px" marginTop="-500px" display="flex">
      <DraggableItem
        mouseMoveHandler={mouseMoveHandler}
        color={color?.picker1}
        xPos={80}
        yPos={50}
        id="picker1"
      />
      <DraggableItem
        mouseMoveHandler={mouseMoveHandler}
        color={color?.picker2}
        xPos={10}
        yPos={180}
        id="picker2"
      />
      <DraggableItem
        mouseMoveHandler={mouseMoveHandler}
        color={color?.picker3}
        xPos={350}
        yPos={80}
        id="picker3"
      />
      <DraggableItem
        mouseMoveHandler={mouseMoveHandler}
        color={color?.picker4}
        xPos={200}
        yPos={300}
        id="picker4"
      />
      <DraggableItem
        mouseMoveHandler={mouseMoveHandler}
        color={color?.picker5}
        xPos={80}
        yPos={370}
        id="picker5"
      />
    </Box>
  );
};
