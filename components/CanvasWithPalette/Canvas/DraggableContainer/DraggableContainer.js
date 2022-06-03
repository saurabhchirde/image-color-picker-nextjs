import { Box } from "@chakra-ui/react";
import { DraggableItem } from "../DraggableItems/DraggableItems";

export const DraggableContainer = ({ mouseMoveHandler, color }) => {
  return (
    <Box position="absolute" w="500px" marginTop="-600px" display="flex">
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
        xPos={300}
        yPos={50}
        id="picker3"
      />
      <DraggableItem
        mouseMoveHandler={mouseMoveHandler}
        color={color?.picker4}
        xPos={300}
        yPos={500}
        id="picker4"
      />
      <DraggableItem
        mouseMoveHandler={mouseMoveHandler}
        color={color?.picker5}
        xPos={100}
        yPos={400}
        id="picker5"
      />
    </Box>
  );
};
