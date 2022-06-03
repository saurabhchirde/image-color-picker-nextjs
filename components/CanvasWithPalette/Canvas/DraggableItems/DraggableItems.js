import { Box } from "@chakra-ui/react";
import Draggable from "react-draggable";

export const DraggableItem = ({ mouseMoveHandler, color, xPos, yPos, id }) => {
  return (
    <Draggable
      bounds=".draggable-container"
      onStart={mouseMoveHandler}
      onDrag={mouseMoveHandler}
      defaultPosition={{ x: xPos, y: yPos }}
    >
      <Box
        w={8}
        h={8}
        borderRadius="full"
        backgroundColor={color}
        id={id}
        border="2px solid white"
        cursor="pointer"
      />
    </Draggable>
  );
};
