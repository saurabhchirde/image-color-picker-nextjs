import { Box } from "@chakra-ui/react";
import { usePebble } from "../../../../context/PebbleContext";
import { DraggableItem } from "./DraggableItems/DraggableItems";

export const DraggableContainer = ({ mouseMoveHandler, canvasDimention }) => {
  const { pickerPos, color } = usePebble();

  return (
    <Box
      position="absolute"
      w={`${canvasDimention.width}px`}
      h={`${canvasDimention.height}px`}
      className="draggable-container"
    >
      <DraggableItem
        mouseMoveHandler={mouseMoveHandler}
        color={color?.picker1}
        xPos={pickerPos?.picker1.x}
        yPos={pickerPos?.picker1.y}
        id="picker1"
      />
      <DraggableItem
        mouseMoveHandler={mouseMoveHandler}
        color={color?.picker2}
        xPos={pickerPos?.picker2.x}
        yPos={pickerPos?.picker2.y}
        id="picker2"
      />
      <DraggableItem
        mouseMoveHandler={mouseMoveHandler}
        color={color?.picker3}
        xPos={pickerPos?.picker3.x}
        yPos={pickerPos?.picker3.y}
        id="picker3"
      />
      <DraggableItem
        mouseMoveHandler={mouseMoveHandler}
        color={color?.picker4}
        xPos={pickerPos?.picker4.x}
        yPos={pickerPos?.picker4.y}
        id="picker4"
      />
      <DraggableItem
        mouseMoveHandler={mouseMoveHandler}
        color={color?.picker5}
        xPos={pickerPos?.picker5.x}
        yPos={pickerPos?.picker5.y}
        id="picker5"
      />
    </Box>
  );
};
